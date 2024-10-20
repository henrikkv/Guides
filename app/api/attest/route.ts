import { NextResponse } from 'next/server';
import {
  SignProtocolClient,
  SpMode,
  EvmChains,
  IndexService
} from "@ethsign/sp-sdk";
import { privateKeyToAccount } from "viem/accounts";

export async function POST(request: Request) {
  try {
    const { userAddress, lessonId } = await request.json();

    const privateKey = process.env.PRIVATE_KEY;
    if (!privateKey) {
      throw new Error('Private key not found in environment variables');
    }

    // Convert the private key to an account
    const account = privateKeyToAccount(`0x${privateKey}`);

    const client = new SignProtocolClient(SpMode.OnChain, {
      chain: EvmChains.polygonAmoy,
      account: account,
    });

    // Create an indexing service
    const indexingService = new IndexService("testnet");

    console.log("userAddress", userAddress);
    console.log("Checking for existing attestations. LessonId:", lessonId);

    const existingAttestations = await indexingService.queryAttestationList({
      schemaId: "onchain_evm_80002_0x7c",
      indexingValue: userAddress,
      page: 0,
      mode: "onchain",
    });

    console.log('Number of existing attestations:', existingAttestations?.rows.length);

    const hasExistingAttestation = (existingAttestations?.rows.length ?? 0) > 0;

    console.log('Has existing attestation:', hasExistingAttestation);

    if (hasExistingAttestation) {
      return NextResponse.json({ success: false, error: 'Attestation for this lesson already exists' }, { status: 400 });
    }

    // If no existing attestation, create a new one
    const createAttestationRes = await client.createAttestation({
      schemaId: "0x7c",
      data: {
        lessonId: `0x${parseInt(lessonId).toString(16).padStart(64, '0')}`,
      },
      indexingValue: userAddress,
      recipients: [userAddress],
    });

    return NextResponse.json({ success: true, attestationId: createAttestationRes.attestationId });
  } catch (error) {
    console.error('Error creating attestation:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    return NextResponse.json({ success: false, error: 'Failed to create attestation', details: String(error) }, { status: 500 });
  }
}

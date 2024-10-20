import { NextResponse } from 'next/server';
import {
  SignProtocolClient,
  SpMode,
  EvmChains,
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

    const createAttestationRes = await client.createAttestation({
      schemaId: "0x7c",
      data: { lesson_id: BigInt(lessonId) },
      indexingValue: userAddress,
      recipients: [userAddress], // Set the user as the recipient
    });

    return NextResponse.json({ success: true, attestationId: createAttestationRes.attestationId });
  } catch (error) {
    console.error('Error creating attestation:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    return NextResponse.json({ success: false, error: 'Failed to create attestation', details: error.message }, { status: 500 });
  }
}

import { signJwtAccessToken } from "@/lib/jwt";
import prismadb from "@/lib/prismadb";
import * as bcrypt from "bcrypt";

export async function POST(request) {
  const body = await request.json();

  const { username, phoneNumber, password } = body;

  const user = await prismadb.user.findUnique({
    where: {
      username,
      phoneNumber,
    },
  });

  if (user && (await bcrypt.compare(password, user.password))) {
    const { password, ...userWithoutPass } = user;
    const accessToken = signJwtAccessToken(userWithoutPass);
    const result = {
      ...userWithoutPass,
      accessToken,
    };
    return new Response(JSON.stringify(result));
  } else return new Response(JSON.stringify(null));
}

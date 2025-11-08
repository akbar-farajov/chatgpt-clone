import { googleLogin } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export const GoogleAuthButton = () => {
  return (
    <Button variant="outline" type="button" onClick={googleLogin}>
      <Image src="/icons/google.svg" alt="Google" width={18} height={18} />
      Login with Google
    </Button>
  );
};

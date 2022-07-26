import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { useSession, signOut } from "next-auth/react";
import Logo from "assets/Logo/Logo.png";
import Button from "./Button";
import Link from "next/link";

const UserProfileBox = ({ session }) => {
  return (
    <>
      {session ? (
        <button onClick={() => signOut()}>로그아웃</button>
      ) : (
        <Link href="/login">
          <Button type="primary" size="sm">
            로그인
          </Button>
        </Link>
      )}
    </>
  );
};

export default function Header({ menus }) {
  const theme = useTheme();
  const { data: session } = useSession();

  return (
    <StyledHeader theme={theme}>
      <img src={Logo.src} alt="어쩌다보니비건 로고" width={200} height={28} />
      <Menu>
        {menus.map((item) => {
          return (
            <Link href={item?.route}>
              <MenuItem>{item?.name}</MenuItem>
            </Link>
          );
        })}
        <UserProfileBox session={session} />
      </Menu>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  height: 80px;
  width: calc(100% - 96px);

  background: ${(p) => p.theme.palette.colors.primary[50]};

  display: flex;
  align-items: center;
  padding: 0px 48px;
`;

const Menu = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  gap: 32px;
`;

const MenuItem = styled.div`
  ${(p) => p.theme.typography.body1}
  ${(p) => p.theme.typography.weightBold}
  color: ${(p) => p.theme.palette.colors.basic.black};
  cursor: pointer;
`;

const LoginButton = styled.button`
  margin-left: 26px;
`;

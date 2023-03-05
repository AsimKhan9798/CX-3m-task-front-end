import { getSession } from "next-auth/react";

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
      },
      props: {},
    };
  } else {
    return {
      redirect: {
        destination: "/register",
      },
      props: {},
    };
  }
}

export default function Index() {
  return <div></div>;
}

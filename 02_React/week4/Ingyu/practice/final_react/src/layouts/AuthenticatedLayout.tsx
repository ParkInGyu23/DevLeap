// import { Outlet, useNavigate } from "react-router";
// import { useAuthStore } from "../stores/useAuthStore";
// import { useEffect, useState } from "react";

// export default function AuthenticatedLayout() {
//   const navigate = useNavigate();
//   const user = useAuthStore((state) => state.user);
//   const [show, setShow] = useState(false);
//   useEffect(() => {
//     if (!user) {
//       navigate('/auth');
//     } else {
//       setShow(true);
//     }
//   }, [navigate,user]);

//   return <>{show && <Outlet />}</>
// }

import { Outlet, useNavigate } from "react-router";
import { useAuthStore } from "../stores/useAuthStore";
import { useEffect } from "react";

export default function AuthenticatedLayout() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    // 1. 유저 정보가 없으면 즉시 로그인 페이지로 보냄
    if (!user) {
      navigate('/auth');
    }
  }, [navigate, user]);

  //  유저가 없으면 아래 Outlet(컴포넌트)을 렌더링하지 않고 차단함
  if (!user) return null; 

  return <Outlet />;
}
import Admin from "components/myWork/Admin";
import Doctor from "components/myWork/Doctor";
import Hospital from "components/myWork/Hospital";
import InputNoticer from "components/myWork/InputNoticer";
import Researcher from "components/myWork/Researcher";
import { useEffect, useState } from "react";
import { getUserRole } from "services/CommonService";
import { loadWorkList } from "services/workService";

function MyWorkPage() {
  const [myRole, setMyRole] = useState("");

  const switchingPage = () => {
    switch (myRole) {
      case "관리자":
        return <Admin />;
      case "병상배정반":
        return <Hospital />;
      case "역조관":
        return <Doctor />;
      case "역조원":
        return <Researcher />;
      case "입력&통보원":
        return <InputNoticer />;
      default:
        return null;
    }
  };

  useEffect(() => {
    getUserRole().then((res) => setMyRole(res));
    loadWorkList();
  }, []);

  return <>{switchingPage()}</>;
}

export default MyWorkPage;

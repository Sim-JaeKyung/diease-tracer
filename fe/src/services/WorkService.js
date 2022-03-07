import axios from "axios";

export async function loadWorkList() {
  const res = await axios.post("api/mywork/loadWorkList", {});
  console.log(res);
}

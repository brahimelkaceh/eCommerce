import Container from "../../Features/dashboard/Container";
import { UserC } from "../../Features/auth/Context";

const AdminDashboard = () => {
  const { role, loading, username } = UserC();

  return (
    //<>
    // {role === "admin" && <Container />}
    //{role === "manager" && (
    //<>
    //    <h1>hello {username} manager dashboard</h1>
    // </>
    //)}
    //</>
    <Container />
  );
};

export default AdminDashboard;

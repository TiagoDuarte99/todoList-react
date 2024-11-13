import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ListUsers from "../ListUsers/listUsers";
function Dashboard() {
  const { logout } = useAuth();

  const Logout = () => {
    logout();
  };

  return (
    <div className="h-full w-full">
        <Button onClick={Logout}>Logout</Button>
      <div className=" flex justify-center">
        <h1 className="text-3xl my-10">Dashboard</h1>
      </div>
      <div className="px-12 pb-12">
        <Tabs defaultValue="users">
          <TabsList>
            <TabsTrigger value="users">Editar Utilizadores</TabsTrigger>
            <TabsTrigger value="password">outras coisas</TabsTrigger>
          </TabsList>
          <TabsContent value="users">
            <ListUsers></ListUsers>
          </TabsContent>
          <TabsContent value="password">
            Mostrar outras funcionalidade exemplo graficos
          </TabsContent>
        </Tabs>

      </div>
    </div>
  );
}

export default Dashboard;

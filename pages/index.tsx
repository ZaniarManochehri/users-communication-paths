// @ts-nocheck
import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import { Breadcrumb, Accordion } from "components";
import api from "./../services/axios";
import { createServer } from "miragejs";


const Home= (props) =>{
  
  const breadList = [
    { name: "خانه", link: "http://116.203.243.155:3082/" },
    { name: "کاربر", link: "http://116.203.243.155:3082/" },
    { name: "تنظیمات کاربری", link: "http://116.203.243.155:3082/" },
  ];

  const [socials, setSocials] = useState([]);

  const createVirtualServer = () => {
    createServer({
      routes() {
        this.get("/api/user", () => ({
          user: {
            name: "Zaniar Manochehri",
            socials: [
              { id: 1, link: "https://test.com", type: "Instagram" },
              { id: 2, link: "https://test1.com", type: "Telegram" },
            ],
          },
        }));
    
        this.post("/api/social", (schema, request) => {
          let attrs = JSON.parse(request.requestBody);
          return { social: attrs };
        });
    
        this.delete("/api/social/:id", (schema, request) => {
          let id = request.params.id;
          return { socialId: id };
        });
      },
    });
  }
  useEffect(() => {
    // createVirtualServer()
    api
      .get("/user")
      .then(({data}) => {
        const {user} = data;
        setSocials(user.socials)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Stack alignItems="center">
      <Stack style={{ width: "100%", maxWidth: 900 }} spacing={1} gap={6}>
        <Stack spacing={1}>
          <Breadcrumb breadList={breadList} />
        </Stack>
        <Accordion socials={socials}/>
      </Stack>
    </Stack>
  );
}


export default Home;

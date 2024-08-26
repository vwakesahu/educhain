import Hero from "@/components/ui/Hero";
import LogoGrid from "@/components/ui/LogoGrid";
import Navbar from "@/components/ui/Navbar";
import React from "react";

const Home = ({ setSelectedTab, loggedIn, login }) => {
  return (
    <div>
      <Hero setSelectedTab={setSelectedTab} loggedIn={loggedIn} login={login} />
      <LogoGrid />
    </div>
  );
};

export default Home;

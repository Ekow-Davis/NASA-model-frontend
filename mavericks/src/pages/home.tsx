import Hero from "../components/hero";
import Main from "../components/main";
import HomeResults from "../components/homeResults";

const Home = () => {
  return (
    <div>
      <Hero />
      <div className=" h-[0.2px] w-full bg-gradient-to-b from-transparent to-[#101022]/90 backdrop-blur-md" />
      <Main />
      <HomeResults isExoplanet={true} accuracy={75} />
    </div>
  );
};

export default Home;

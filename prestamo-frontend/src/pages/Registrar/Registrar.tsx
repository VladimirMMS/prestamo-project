import { useEffect, useState } from "react";
import SignUpForm from "../../components/SignupForm/SignupForm";
import axios from "axios";

export default function Registrar() {
  const [data, setData] = useState({ countries: [], provinces: [] });
  const fetchData = async () => {
    try {
      const [countriesRes, provincesRes] = await Promise.all([
        axios.get("http://localhost:3000/api/country/country"),
        axios.get("http://localhost:3000/api/country/province"),
      ]);

      setData({
        countries: countriesRes.data,
        provinces: provincesRes.data,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(data);
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
      }}
    >
      <SignUpForm country={data.countries} provincia={data.provinces} />
    </div>
  );
}

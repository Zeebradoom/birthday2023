import { createClient } from "@supabase/supabase-js";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const supabaseUrl = "https://wxiwkxupnytwqnggninu.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4aXdreHVwbnl0d3FuZ2duaW51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA3MTQ4OTQsImV4cCI6MjAxNjI5MDg5NH0.GmyBMR_mdSVofR_dVgEZKt2WoW829RUfFTVOOuDloZ0";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function Login() {
  const navigate = useNavigate();
  let email = "";

  const signInWithGoogle = async () => {
    let { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    console.log(data);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    console.log(user);

    if (error) console.error("Error logging in:", error);
  };

  async function isUserVerified() {
    console.log("here");
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error) {
      console.log("Error fetching user: ", error);
      return false;
    }
    console.log(user);
    // email = user.email;
    // const verifiedUsers = [
    //   "derrick_cui@berkeley.edu",
    //   "bradley_tian@berkeley.edu",
    //   "cderrick126@gmail.com",
    // ]; // Your verified users list

    // return verifiedUsers.includes(email);
    return true;
  }

  useEffect(() => {
    // Check if user is signed in and verified
    // supabase.auth.onAuthStateChange(async (event, session) => {
    //   const verified = await isUserVerified();
    //   if (!verified) {
    //     navigate("/unauthorized", {}); // Redirect to an unauthorized page
    //   } else {
    //     navigate("/welcome", { email }); // Redirect to a welcome page
    //   }
    // });
  });

  return (
    <div>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
}

export default Login;

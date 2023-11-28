import { createClient } from "@supabase/supabase-js";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function Login() {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    const { user, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    if (user) {
      console.log("User's email:", user.email);
    }

    if (error) console.error("Error logging in:", error);
  };

  async function isUserVerified() {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error) {
      console.log("Error fetching user: ", error);
      return false;
    }
    const userEmail = user.email;
    const verifiedUsers = [
      "derrick_cui@berkeley.edu",
      "bradley_tian@berkeley.edu",
    ]; // Your verified users list
    return verifiedUsers.includes(userEmail);
  }

  useEffect(() => {
    // Check if user is signed in and verified
    supabase.auth.onAuthStateChange(async (event, session) => {
      const verified = await isUserVerified();
      if (!verified) {
        navigate("/unauthorized", {}); // Redirect to an unauthorized page
      } else {
        navigate("/welcome", {}); // Redirect to a welcome page
      }
    });
  }, [navigate]);

  return (
    <div>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
}

export default Login;

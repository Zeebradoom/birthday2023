import { createClient } from "@supabase/supabase-js";
import Reac from "react";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function Welcome(email) {
  const styles = {
    partyInvite: {
      textAlign: "center",
      padding: "20px",
      backgroundColor: "#f0f0f0",
      borderRadius: "10px",
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    },
    header: {
      color: "#333",
      fontSize: "2em",
      marginBottom: "10px",
    },
  };

  async function editValue() {
    await supabase
      .from("authed")
      .insert([{ email: email }])
      .select();
  }

  return (
    <div style={styles.partyInvite}>
      <div className="party-invite">
        <h1>You are invited to Derrick's 20th birthday party!</h1>
        <p>
          It will be on Dec 7 at 8pm on the rooftop of Identity. (my birthday is
          Dec 6 tho but i got NGC stuff lmao){" "}
        </p>

        {/* Include firework animations here */}

        <button onClick={editValue()}> I will come! </button>
        <button> I will not :( </button>

        <p>Msg Derrick when you arrive</p>
      </div>
    </div>
  );
}

export default Welcome;

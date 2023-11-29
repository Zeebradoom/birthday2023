import { createClient } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";

const supabaseUrl = "https://wxiwkxupnytwqnggninu.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4aXdreHVwbnl0d3FuZ2duaW51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA3MTQ4OTQsImV4cCI6MjAxNjI5MDg5NH0.GmyBMR_mdSVofR_dVgEZKt2WoW829RUfFTVOOuDloZ0";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Login() {
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

  const [session, setSession] = useState(null);

  function isUserVerified(email) {
    const verifiedUsers = [
      "derrick_cui@berkeley.edu",
      "bradley_tian@berkeley.edu",
      "cderrick126@gmail.com",
      "amelie.sen@berkeley.edu",
      "wtgerken@berkeley.edu",
      "fogel@berkeley.edu",
      "lawsongraham@berkeley.edu",
      "senahazir@berkeley.edu",
      "mindytsai@berkeley.edu",
      "trentchu@berkeley.edu",
      "elizaveta.belkina@berkeley.edu",
      "wang_zixun@berkeley.edu",
      "bellenichatorn@berkeley.edu",
      "tommyhang@berkeley.edu",
      "trevortrinh@berkeley.edu",
      "carolx@berkeley.edu",
    ];
    return verifiedUsers.includes(email);
  }

  useEffect(() => {
    fetchAttendeesComing();

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const [attendeesComing, setAttendeesComing] = useState([]);

  const editValue = async (yes) => {
    try {
      console.log("try");

      // Check if the user already exists in the 'attendance' table
      let { data: existingUser, error: fetchError } = await supabase
        .from("attendance")
        .select("*")
        .eq("email", session.user.email);

      if (fetchError) {
        console.error("Error fetching user:", fetchError);
        return;
      }

      let data, error;

      if (existingUser && existingUser.length > 0) {
        // User exists, update their record
        ({ data, error } = await supabase
          .from("attendance")
          .update({ coming: yes, name: session.user.user_metadata.full_name })
          .eq("email", session.user.email));
      } else {
        // User does not exist, insert a new record
        ({ data, error } = await supabase.from("attendance").insert([
          {
            email: session.user.email,
            coming: yes,
            name: session.user.user_metadata.full_name,
          },
        ]));
      }

      await fetchAttendeesComing();

      if (error) {
        console.error("Error:", error);
      } else {
        console.log("Data:", data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchAttendeesComing = async () => {
    let { data, error } = await supabase
      .from("attendance")
      .select("*")
      .eq("coming", true);

    if (error) {
      console.error("Error fetching attendees:", error);
      return;
    }

    setAttendeesComing(data);
  };

  if (!session) {
    return (
      <div>
        <p>Please only use the Connect Google button lolz</p>
        <Auth providers={["google"]} supabaseClient={supabase} />
      </div>
    );
  } else {
    if (isUserVerified(session.user.email)) {
      return (
        <div style={styles.partyInvite}>
          <div className="party-invite">
            <h1>You are invited to Derrick's 20th birthday party!</h1>
            <p>
              It will be on Dec 7 at 8pm on the rooftop of Identity. (my
              birthday is Dec 6 tho but i got NGC stuff lmao)
            </p>
            <button onClick={() => editValue(true)}> I will come! </button>
            <button onClick={() => editValue(false)}> I will not :( </button>
            <p>Msg Derrick when you arrive</p>

            <table>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {attendeesComing.map((attendee, index) => (
                  <tr key={index}>
                    <td>{attendee.name}</td>
                    <td>Coming</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    } else {
      return (
        <div className="unauthorized-container">
          <h1>Unauthorized</h1>
          <p>
            You are not authorized to access this page. You are ugly and I hate
            you. My balls are itchy.
          </p>
        </div>
      );
    }
  }
}

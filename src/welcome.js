import React from "react";

function Welcome() {
  // Function to check if the user is verified
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
    // ... other styles
  };

  return (
    <div style={styles.partyInvite}>
      <div className="party-invite">
        <h1>You are invited to Derrick's 20th birthday party!</h1>
        <p>It will be on Dec 7 at 8pm on the rooftop of Identity.</p>
        <p>Msg Derrick when you arrive</p>
        {/* Include firework animations here */}

        <button> I will come! </button>
        <button> I will not :( </button>
      </div>
    </div>
  );
}

export default Welcome;

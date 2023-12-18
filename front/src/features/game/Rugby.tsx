import { Box, Typography } from "@mui/material";

function Rugby() {


  return (
    <>
      <Box sx={{ marginTop: 2, marginLeft: 2, borderRadius: 1, border: `1px solid #366873`, height: "calc(100vh - 120px)", overflowY: "auto" }}>
        <div className="relative h-screen overflow-hidden px-6 pt-16 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
          <Typography className="PlayerList__title" sx={{ color: "#015958", fontWeight: "bold", fontSize: "13px" }}>
            ChatBot
          </Typography>
          <div className="game-sketch absolute inset-0" style={{ height: "calc(100vh - 200px)" }}>
            {(() => {
                  return (
                    <div className="text-center p-4">
                    <h4 className="text-2xl font-bold mb-2">Bienvenue sur le ChatBot du rugby</h4>
                    {/* <h5 className="text-xl font-semibold mb-2">{user?.fullName}</h5> */}
                    <p className="text-base mb-4">Rentrez votre question</p>
                    <form action="/submit-your-question" method="post">
                        <textarea className="chat-input" name="question" placeholder="Write your question here..."></textarea>
                        <button type="submit" className="send-button font-bold py-2 px-4 rounded mt-2">Send</button>
                    </form>
                  </div>
                  );
            })()}
          </div>
        </div>
      </Box>
    </>
  );
}

export default Rugby;

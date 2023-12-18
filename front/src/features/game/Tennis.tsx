import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

function Tennis() {

  const [responseMessage, setResponseMessage] = useState('');


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const textarea = document.getElementById('question') as HTMLTextAreaElement;
    const question = textarea.value;
  
    try {
      const response = await axiosInstance.post("/user/tennis", {
        question,
      });
        console.log(response.data.message);
        setResponseMessage(response.data.message.question);
    } catch (error) {
        console.error('Error:', error);
    }
};


  return (
    <>
      <div className="mt-2 ml-2 rounded border border-[#366873] h-[calc(100vh-120px)] overflow-y-auto">
        <div className="flex flex-col items-center justify-center h-screen">
          <h4 className="text-[#015958] font-bold text-lg mb-4">ChatBot</h4>
          <div className="w-full max-w-md p-4">
            <h4 className="text-2xl font-bold text-center mb-2">Bienvenue sur le ChatBot du tennis</h4>
            {/* <h5 className="text-xl font-semibold text-center mb-2">{user?.fullName}</h5> */}
            <p className="text-base text-center mb-4">Rentrez votre question</p>
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <textarea id="question" className="w-full p-2 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 mb-4" name="question" placeholder="Write your question here..."></textarea>
                <button type="submit" className="h-12 w-12 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full flex items-center justify-center">Send</button>
            </form>
          </div>
            {responseMessage && <div className="text-center mt-4">{responseMessage}</div>} {/* Displaying the response message */}
        </div>
      </div>
    </>
  );
}

export default Tennis;

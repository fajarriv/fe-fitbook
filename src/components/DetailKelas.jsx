"use client";
import { useEffect, useState } from "react";
import useFetchWithToken from "@/hooks/fetchWithToken";
import { useRouter } from "next/navigation";
import { useToken } from "@/hooks/useToken";

const DetailKelas = ({ id }) => {
  const { getPenggunaToken } = useToken()
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const fetchWithToken = useFetchWithToken();
  const [kelasDetail, setKelasDetail] = useState();
  const [showAskQuestion, setShowAskQuestion] = useState(false);
  const [question, setQuestion] = useState("");
  const [submittedQuestions, setSubmittedQuestions] = useState([]);
  const goBack = () => {
    router.back();
  };

  useEffect(() => {
    const fetchKelasDetail = async () => {
      try {
        try {
          if (id) {
            const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/sesi-kelas/${id}`;
            const response = await fetch(apiUrl, {
              method: "GET",
              headers: {
                "Authorization": `Bearer ${getPenggunaToken()}`
              }
            });
            const data = await response.json();
            setKelasDetail(data.data);
          }
        } catch (error) {
          console.error('Error fetching class detail:', error);
        }
      } catch (error) {
        console.error('Error fetching class detail:', error);
      }
    };

    fetchKelasDetail();
  }, [id]);

  useEffect(() => {
    // When the component unmounts
    return () => {
      closeModal();
    };
  }, []);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const toggleAskQuestion = () => {
    setShowAskQuestion(!showAskQuestion);
  };

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const submitQuestion = async () => {
    // try {
    //   const payload = {
    //     pertanyaan: question,
    //     sesiKelasId: id, 
    //   };

    //   const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/create-pertanyaan`;
    //   const response = await fetch(apiUrl, {
    //     method: "POST",
    //     headers: {
    //       "Authorization": `Bearer ${getPenggunaToken()}`,
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(payload),
    //   });

    //   if (response.ok) {
    //     console.log("Question submitted successfully");
    //     setSubmittedQuestions([...submittedQuestions, question]);
    //     setQuestion("");
    //     setShowAskQuestion(false);
    //   } else {
    //     console.error("Failed to submit question");
    //   }
    // } catch (error) {
    //   console.error("Error submitting question:", error);
    // }
    setSubmittedQuestions([...submittedQuestions, question]);
        setQuestion("");
        setShowAskQuestion(false);
  };

  return (
    <div className="container mx-auto mt-10 px-4">
      <button
        onClick={goBack}
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Back to Dashboard
      </button>
      <h1 className="text-3xl font-bold mb-4">{kelasDetail?.judul}</h1>
      <p className="text-lg mb-4">{kelasDetail?.deskripsi}</p>

      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-2">Class Details</h2>
        <p className="text-lg">
          <span className="font-bold">Trainer: </span>
          {kelasDetail?.trainer.name}
        </p>
        <p className="text-lg">
          <span className="font-bold">Location: </span>
          {kelasDetail?.lokasi}
        </p>
        <p className="text-lg">
          <span className="font-bold">Participants: </span>
          {kelasDetail?.currentParticipant} / {kelasDetail?.maxParticipant}
        </p>
        <p className="text-lg">
          <span className="font-bold">Status: </span>
          {kelasDetail?.status}
        </p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={openModal}
        >
          Lihat Profil Trainer
        </button>
      </div>

      {showModal && (
        <div key="modal" className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="text-center sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                      Trainer Details
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      Trainer Name: {kelasDetail?.trainer.name}
                    </p>
                    <p className="text-sm text-gray-500 mb-2">
                      Email: {kelasDetail?.trainer.email}
                    </p>
                    <p className="text-sm text-gray-500 mb-2">
                      Bio: {kelasDetail?.trainer.bio}
                    </p>
                    <p className="text-sm text-gray-500 mb-2">
                      No Telpon: {kelasDetail?.trainer.noTelp}
                    </p>
                    <p className="text-sm text-gray-500 mb-2">
                      Rating: {kelasDetail?.trainer.rating}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={closeModal}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={toggleAskQuestion}
      >
        {showAskQuestion ? "Close Ask Question" : "Ask a Question"}
      </button>

      {showAskQuestion && (
        <div className="mt-4">
          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            value={question}
            onChange={handleQuestionChange}
            placeholder="Type your question here"
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
            onClick={submitQuestion}
          >
            Submit Question
          </button>
        </div>
      )}

      <div className="mt-6" style={{ maxHeight: "200px", overflowY: "auto" }}>
        <h2 className="text-2xl font-bold mb-2">Submitted Questions</h2>
        {submittedQuestions.map((q, index) => (
          <p key={index} className="text-lg mt-2">
            {q}
          </p>
        ))}
      </div>
    </div>
  );
};

export default DetailKelas;

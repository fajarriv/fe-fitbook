import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

const DetailKelas = ({ id }) => {
  const router = useRouter();
  const params = useParams();
  const [kelasDetail, setKelasDetail] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showAskQuestion, setShowAskQuestion] = useState(false);
  const [question, setQuestion] = useState('');
  const [submittedQuestions, setSubmittedQuestions] = useState([]);

  useEffect(() => {
    console.log(id);
    const fetchKelasDetail = async () => {
      try {
        const responseData = {
          code: 200,
          data: {
            id: '04eef712-19d1-484a-8076-668626d820c8',
            judul: 'Kelas Aerobik Mantap',
            deskripsi: 'Membuat jantung dan badan sehat',
            trainer: {
              id: 'ae3e25ee-ec54-4bbf-b2a5-e276563d66bd',
              role: 'Trainer',
              name: 'jarip',
              email: 'useraja@gmial.com',
              displayName: 'jaripcoy',
              noTelp: '021',
              bio: 'halo ini bio',
              rating: null,
            },
            jadwalWaktu: '2023-12-21T19:00:00',
            lokasi: 'JIM TERDEKAT CUY',
            maxParticipant: 20,
            currentParticipant: 0,
            status: 'Ongoing',
          },
          status: 'OK',
          message: 'success',
        };

        setKelasDetail(responseData.data);
      } catch (error) {
        console.error('Error fetching class detail:', error);
      }
    };

    fetchKelasDetail();
  }, []);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const toggleAskQuestion = () => {
    setShowAskQuestion(!showAskQuestion);
  };

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const submitQuestion = () => {
    setSubmittedQuestions([...submittedQuestions, question]);
    setQuestion('');
    setShowAskQuestion(false);
  };

  return (
    <div className="container mx-auto mt-10 px-4">
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
          <span className="font-bold">Max Participants: </span>
          {kelasDetail?.maxParticipant}
        </p>
        <p className="text-lg">
          <span className="font-bold">Current Participants: </span>
          {kelasDetail?.currentParticipant}
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
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="text-center sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Trainer Details</h3>
                    <p className="text-sm text-gray-500 mb-2">Trainer Name: {kelasDetail?.trainer.name}</p>
                    <p className="text-sm text-gray-500 mb-2">Email: {kelasDetail?.trainer.email}</p>
                    <p className="text-sm text-gray-500 mb-2">Bio: {kelasDetail?.trainer.bio}</p>
                    <p className="text-sm text-gray-500 mb-2">No Telpon: {kelasDetail?.trainer.noTelp}</p>
                    <p className="text-sm text-gray-500 mb-2">Rating: {kelasDetail?.trainer.rating}</p>
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
        {showAskQuestion ? 'Close Ask Question' : 'Ask a Question'}
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
    
      <div className="mt-6" style={{ maxHeight: '200px', overflowY: 'auto' }}>
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

import React, { useState } from 'react';
import { addResult } from '../api/api';

const ResultEntry = () => {
  const [subject, setSubject] = useState('');
  const [marks, setMarks] = useState('');
  const [speechText, setSpeechText] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleSpeech = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = true;
  
    recognition.onstart = () => {
      setIsListening(true); // Start listening
    };
  
    recognition.onend = () => {
      setIsListening(false); // Stop listening
    };
  
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSpeechText(transcript);
  
      // Updated regex to match both single and multi-digit values, including decimals
      const marksFromSpeech = transcript.match(/(\d+(\.\d+)?)/g); // Match all occurrences of numbers (int or decimal)
      const subjectFromSpeech = transcript.replace(/(\d+(\.\d+)?)/g, '').trim(); // Remove numbers to extract the subject
  
      if (marksFromSpeech && marksFromSpeech.length > 0) {
        setMarks(marksFromSpeech[0]); // Set the marks to the first found number
      }
      if (subjectFromSpeech) {
        setSubject(subjectFromSpeech); // Set the subject from the remaining text
      }
    };
  
    recognition.start(); // Start speech recognition
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addResult({ subject, marks }); // Submit the subject and marks to the backend
    setSubject('');
    setMarks('');
  };

  return (
    <div>
      <h2>Enter Results</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject"
          required
        />
        
        <input
          type="number"
          step="0.1" // Allows decimal input
          value={marks}
          onChange={(e) => setMarks(e.target.value)}
          placeholder="Marks"
          required
        />
        
        <button type="button" onClick={handleSpeech} disabled={isListening}>
          {isListening ? 'Listening...' : 'Speak'}
        </button>
        
        <button type="submit">Submit</button>
      </form>
      
      <p>Recognized Speech: {speechText}</p>
    </div>
  );
};

export default ResultEntry;
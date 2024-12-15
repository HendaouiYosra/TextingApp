// Import the functions you need from the SDKs you need
import app from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/database";

import { createClient } from '@supabase/supabase-js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {

  apiKey: "AIzaSyABAsL9c0pVzHCgZx8GTif7Roh4_26YRUA",

  authDomain: "messenger-d2aed.firebaseapp.com",

  databaseURL: "https://messenger-d2aed-default-rtdb.firebaseio.com",

  projectId: "messenger-d2aed",

  storageBucket: "messenger-d2aed.firebasestorage.app",

  messagingSenderId: "164758341718",

  appId: "1:164758341718:web:01158f9e6ce621960493f7",

  measurementId: "G-2H18JCRMQK"

};


// Initialize Firebase
const firebase = app.initializeApp(firebaseConfig);
export default firebase;


const supabaseUrl = 'https://elawbihboerevarmfloa.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsYXdiaWhib2VyZXZhcm1mbG9hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1OTgyMTgsImV4cCI6MjA0OTE3NDIxOH0.scMNQT8xq2P4rG2qdItoPiBrTrojta10GhtfJXqOcK8";
const supabase = createClient(supabaseUrl, supabaseKey);
export { supabase ,supabaseKey };
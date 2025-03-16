import React from 'react';
import { createRoot } from 'react-dom/client';

import 'font-awesome/css/font-awesome.min.css';

import App from './App';

import './index.css';

const root = createRoot(document.getElementById('root')!);

root.render(<App />);

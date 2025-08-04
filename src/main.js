console.log('VITE FILE CHECK:', import.meta.glob('./views/*'));



// ✅ Import the domController from the views folder
import  { domController } from './modules/views/domController.js';

// ✅ Initialize the app (attach events, load data, render UI)
domController.init();

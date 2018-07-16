/* Based on SCORM_API_wrapper.js */

var T2 = {};                                  //T2 'namespace' helps ensure no conflicts with possible other "TIMS" variables
T2.UTILS = {};                                //For holding UTILS functions
T2.debug = { isActive: true };                //Enable (true) or disable (false) for debug mode

T2.TIMS = {                                  //Define the TIMS object
   version: null,                               //Store TIMS version.
   handleCompletionStatus: true,                   //Whether or not the wrapper should automatically handle the initial completion status
   handleExitMode: true,                           //Whether or not the wrapper should automatically handle the exit mode
   API: {
      handle: null,
      isFound: false
   },                 //Create API child object
   connection: { isActive: true },                //Create connection child object
   data: {
      completionStatus: null,
      exitStatus: null
   },               //Create data child object
   debug: {},                                  //Create debug child object
};

/* --------------------------------------------------------------------------------
   T2.TIMS.isAvailable
   A simple function to allow Flash ExternalInterface to confirm
   presence of JS wrapper before attempting any communication.

   Parameters: none
   Returns:    Boolean (true)
----------------------------------------------------------------------------------- */

T2.TIMS.isAvailable = function () {
   return true;
};

// ------------------------------------------------------------------------- //
// --- TIMS.API functions ------------------------------------------------- //
// ------------------------------------------------------------------------- //

/* -------------------------------------------------------------------------
   T2.TIMS.API.find(window)
   Looks for an object named API in parent and opener windows

   Parameters: window (the browser window object).
   Returns:    Object if API is found, null if no API found
---------------------------------------------------------------------------- */

T2.TIMS.API.find = function (win) {

   var API = null,
       findAttempts = 0,
       findAttemptLimit = 500,
       traceMsgPrefix = "TIMS.API.find",
       trace = T2.UTILS.trace,
       legacy = T2.TIMS;

   while ((!win.API) &&
          (win.parent) &&
          (win.parent != win) &&
          (findAttempts <= findAttemptLimit)) {

      findAttempts++;
      win = win.parent;

   }

   //If TIMS version is specified by user, look for specific API
   if (legacy.version == "TIMS") {

      if (win.API) {

         API = win.API;

      } else {

         trace(traceMsgPrefix + ": TIMS version was specified by user, but API cannot be found.");

      }

   } else {                             //If TIMS version not specified by user, look for APIs

      legacy.version = "TIMS";       //Set version
      API = win.API;

   }

   if (API) {

      trace(traceMsgPrefix + ": API found. Version: " + legacy.version);
      trace("API: " + API);

   } else {

      trace(traceMsgPrefix + ": Error finding API. \nFind attempts: " + findAttempts + ". \nFind attempt limit: " + findAttemptLimit);

   }

   return API;

};

/* -------------------------------------------------------------------------
   T2.TIMS.API.get()
   Looks for an object named API, first in the current window's frame
   hierarchy and then, if necessary, in the current window's opener window
   hierarchy (if there is an opener window).

   Parameters:  None.
   Returns:     Object if API found, null if no API found
---------------------------------------------------------------------------- */

T2.TIMS.API.get = function () {

   var API = null,
       win = window,
       legacy = T2.TIMS,
       find = legacy.API.find,
       trace = T2.UTILS.trace;

   API = find(win);

   if (!API && win.parent && win.parent != win) {
      API = find(win.parent);
   }

   if (!API && win.top && win.top.opener) {
      API = find(win.top.opener);
   }

   //Special handling for Plateau
   //Thanks to Joseph Venditti for the patch
   if (!API && win.top && win.top.opener && win.top.opener.document) {
      API = find(win.top.opener.document);
   }

   if (API) {
      legacy.API.isFound = true;
   } else {
      trace("API.get failed: Can't find the API!");
   }

   return API;

};

/* -------------------------------------------------------------------------
   T2.TIMS.API.getHandle()
   Returns the handle to API object if it was previously set

   Parameters:  None.
   Returns:     Object (the T2.TIMS.API.handle variable).
---------------------------------------------------------------------------- */

T2.TIMS.API.getHandle = function () {

   var API = T2.TIMS.API;

   if (!API.handle && !API.isFound) {

      API.handle = API.get();

   }

   return API.handle;

};

// ------------------------------------------------------------------------- //
// --- T2.TIMS.connection functions --------------------------------- //
// ------------------------------------------------------------------------- //

/* -------------------------------------------------------------------------
   T2.TIMS.connection.initialize()
   Iinitiate the communication session.

   Parameters:  None
   Returns:     Boolean
---------------------------------------------------------------------------- */

T2.TIMS.connection.initialize = function () {

   var success = false,
       legacy = T2.TIMS,
       trace = T2.UTILS.trace,
       traceMsgPrefix = "TIMS.connection.initialize ";

   trace("connection.initialize called.");

   if (!legacy.connection.isActive) {

      var API = legacy.API.getHandle(),
          errorCode = 0;

      if (API) {

         legacy.connection.isActive = true;
         success = true;

      } else {

         trace(traceMsgPrefix + "failed: API is null.");

      }

   } else {

      trace(traceMsgPrefix + "aborted: Connection already active.");

   }

   return success;

};

/* -------------------------------------------------------------------------
   T2.TIMS.connection.terminate()
   Terminate the communication session

   *** TERMINATE MUST BE CALLED AT END OF LESSON TO CLOSE SESSION ***

   Parameters:  None
   Returns:     Boolean
---------------------------------------------------------------------------- */

T2.TIMS.connection.terminate = function () {

   var success = false,
       legacy = T2.TIMS,
       trace = T2.UTILS.trace,
       traceMsgPrefix = "TIMS.connection.terminate ";


   if (legacy.connection.isActive) {

      var API = legacy.API.getHandle(),
          errorCode = 0;

      if (API) {

         //Ensure we persist the data
         //success = legacy.save();
         success = API.LMSFinish();
         legacy.connection.isActive = false;

      } else {

         trace(traceMsgPrefix + "failed: API is null.");

      }

   } else {

      trace(traceMsgPrefix + "aborted: Connection already terminated.");

   }

   return success;

};

// ------------------------------------------------------------------------- //
// --- T2.TIMS.data functions --------------------------------------- //
// ------------------------------------------------------------------------- //

/* -------------------------------------------------------------------------
   T2.TIMS.data.load()
   Retreaves Param Cmi

   *** LOAD MUST BE CALLED AT START OF THE LESSON ***

   Parameters: None
   Returns:    Boolean
---------------------------------------------------------------------------- */

T2.TIMS.data.load = function () {
   
   var legacy = T2.TIMS,
       trace = T2.UTILS.trace,
       traceMsgPrefix = "TIMS.data.save failed",
       jsonParamCmi = "";


   if (legacy.connection.isActive) {

      var API = legacy.API.getHandle();

      if (API) {

         jsonParamCmi = API.GetParamCmi();

      } else {

         trace(traceMsgPrefix + ": API is null.");

      }

   } else {

      trace(traceMsgPrefix + ": API connection is inactive.");

   }

   return jsonParamCmi;

};

/* -------------------------------------------------------------------------
   T2.TIMS.data.save()
   Persist all data to this point in the session

   *** SAVE SHOULD BE CALLED AT END OF LESSON TO UPDATE ANY INFORMATION ***

   Parameters: None
   Returns:    Boolean
---------------------------------------------------------------------------- */

T2.TIMS.data.save = function (data) {
   
   var success = false,
       legacy = T2.TIMS,
       trace = T2.UTILS.trace,
       traceMsgPrefix = "TIMS.data.save failed";

   if (legacy.connection.isActive) {

      var API = legacy.API.getHandle();

      if (API) {

         success = API.PutParamCmi(data);

      } else {

         trace(traceMsgPrefix + ": API is null.");

      }

   } else {

      trace(traceMsgPrefix + ": API connection is inactive.");

   }

   return success;

};

// ------------------------------------------------------------------------- //
// --- Shortcuts! ---------------------------------------------------------- //
// ------------------------------------------------------------------------- //

// Because nobody likes typing verbose code.

T2.TIMS.init = T2.TIMS.connection.initialize;
T2.TIMS.load = T2.TIMS.data.load;
T2.TIMS.save = T2.TIMS.data.save;
T2.TIMS.quit = T2.TIMS.connection.terminate;

// ------------------------------------------------------------------------- //
// --- T2.UTILS functions -------------------------------------------- //
// ------------------------------------------------------------------------- //

/* -------------------------------------------------------------------------
   T2.UTILS.trace()
   Displays error messages when in debug mode.

   Parameters: msg (string)
   Return:     None
---------------------------------------------------------------------------- */

T2.UTILS.trace = function (msg) {

   if (T2.debug.isActive) {

      if (window.console && window.console.log) {
         window.console.log(msg);
      } else {
         //alert(msg);
      }

   }
};

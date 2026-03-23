import Array "mo:core/Array";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Int "mo:core/Int";

actor {
  type ScriptTemplate = {
    title : Text;
    style : Text;
    hook : Text;
    body : Text;
    twist : Text;
    category : Text;
  };

  type Prompt = {
    stageName : Text;
    promptText : Text;
    toolName : Text;
  };

  type Tool = {
    name : Text;
    category : Text;
    isFree : Bool;
    url : Text;
    description : Text;
  };

  type VideoEntry = {
    title : Text;
    platform : Text;
    status : Text;
    date : Time.Time;
  };

  type WorkflowStage = {
    stepNumber : Nat;
    name : Text;
    description : Text;
    tools : [Text];
  };

  module VideoEntry {
    public func compareByDate(a : VideoEntry, b : VideoEntry) : Order.Order {
      Int.compare(a.date, b.date);
    };
  };

  let scriptTemplates : [ScriptTemplate] = [
    {
      title = "Product Review";
      style = "Engaging";
      hook = "Start with a bold statement";
      body = "Describe features and benefits";
      twist = "Share a personal story";
      category = "Review";
    },
    {
      title = "Tutorial";
      style = "Informative";
      hook = "Highlight a common problem";
      body = "Step-by-step walkthrough";
      twist = "Show a secret tip";
      category = "Education";
    },
    {
      title = "Listicle";
      style = "Energetic";
      hook = "Promise value";
      body = "Countdown main points";
      twist = "Add bonus item";
      category = "Entertainment";
    },
    {
      title = "Interview";
      style = "Conversational";
      hook = "Intriguing question";
      body = "Dialogue format";
      twist = "Unexpected answer";
      category = "Insight";
    },
    {
      title = "Reaction";
      style = "Authentic";
      hook = "Strong facial expression";
      body = "Genuine responses";
      twist = "Add commentary";
      category = "Social";
    },
  ];

  let prompts : [Prompt] = [
    {
      stageName = "Script Writing";
      promptText = "Write a compelling script for viral social media video in given style";
      toolName = "ChatGPT";
    },
    {
      stageName = "Voiceover";
      promptText = "Create natural-sounding voiceover from provided text";
      toolName = "ElevenLabs";
    },
    {
      stageName = "Video Editing";
      promptText = "Automatically edit video according to script cues";
      toolName = "Descript";
    },
    {
      stageName = "Publishing";
      promptText = "Schedule and post video to all selected platforms";
      toolName = "Buffer";
    },
    {
      stageName = "Analytics";
      promptText = "Generate detailed performance report for video";
      toolName = "VidIQ";
    },
  ];

  let tools : [Tool] = [
    {
      name = "ChatGPT";
      category = "AI Copywriting";
      isFree = false;
      url = "https://chat.openai.com";
      description = "AI-powered writing assistant for scripts and captions";
    },
    {
      name = "Descript";
      category = "Video Editing";
      isFree = false;
      url = "https://descript.com";
      description = "Video editing platform with AI audio processing";
    },
    {
      name = "ElevenLabs";
      category = "Voiceover";
      isFree = false;
      url = "https://elevenlabs.io";
      description = "Natural-sounding AI voice generation tool";
    },
    {
      name = "Buffer";
      category = "Publishing";
      isFree = true;
      url = "https://buffer.com";
      description = "Multi-platform social media scheduling tool";
    },
    {
      name = "VidIQ";
      category = "Analytics";
      isFree = true;
      url = "https://vidiq.com";
      description = "YouTube analytics and optimization platform";
    },
  ];

  let workflowStages : [WorkflowStage] = [
    {
      stepNumber = 1;
      name = "Ideation";
      description = "Brainstorm content ideas and research trends";
      tools = ["ChatGPT"];
    },
    {
      stepNumber = 2;
      name = "Scripting";
      description = "Write engaging scripts tailored to platforms";
      tools = ["ChatGPT"];
    },
    {
      stepNumber = 3;
      name = "Production";
      description = "Film and record necessary audio/visuals";
      tools = ["Descript", "ElevenLabs"];
    },
    {
      stepNumber = 4;
      name = "Editing";
      description = "Trim, add effects and polish content";
      tools = ["Descript"];
    },
    {
      stepNumber = 5;
      name = "Publishing";
      description = "Schedule posts across all social platforms";
      tools = ["Buffer"];
    },
    {
      stepNumber = 6;
      name = "Analytics";
      description = "Track video performance and optimize for growth";
      tools = ["VidIQ"];
    },
  ];

  let videoEntriesMap = Map.empty<Time.Time, VideoEntry>();

  public shared ({ caller }) func addVideoEntry(title : Text, platform : Text, status : Text, date : Time.Time) : async () {
    let newEntry : VideoEntry = {
      title;
      platform;
      status;
      date;
    };
    videoEntriesMap.add(date, newEntry);
  };

  public shared ({ caller }) func updateVideoEntry(date : Time.Time, title : Text, platform : Text, status : Text) : async () {
    switch (videoEntriesMap.get(date)) {
      case (null) { Runtime.trap("Video entry not found") };
      case (?entry) {
        let updatedEntry : VideoEntry = {
          title;
          platform;
          status;
          date;
        };
        videoEntriesMap.add(date, updatedEntry);
      };
    };
  };

  public shared ({ caller }) func deleteVideoEntry(date : Time.Time) : async () {
    if (not videoEntriesMap.containsKey(date)) {
      Runtime.trap("Video entry not found");
    };
    videoEntriesMap.remove(date);
  };

  public query ({ caller }) func getVideoEntry(date : Time.Time) : async VideoEntry {
    switch (videoEntriesMap.get(date)) {
      case (null) { Runtime.trap("Video entry not found") };
      case (?entry) { entry };
    };
  };

  public query ({ caller }) func getAllVideoEntries() : async [VideoEntry] {
    videoEntriesMap.values().toArray().sort(VideoEntry.compareByDate);
  };

  public query ({ caller }) func getScriptTemplates() : async [ScriptTemplate] {
    scriptTemplates;
  };

  public query ({ caller }) func getPrompts() : async [Prompt] {
    prompts;
  };

  public query ({ caller }) func getTools() : async [Tool] {
    tools;
  };

  public query ({ caller }) func getWorkflowStages() : async [WorkflowStage] {
    workflowStages;
  };
};

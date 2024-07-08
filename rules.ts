import fs from "fs";
import { KarabinerRules } from "./types";
import { createHyperSubLayers, app, open, rectangle, shell } from "./utils";

const rules: KarabinerRules[] = [
  // Define the Hyper key itself
  {
    description: "Hyper Key (⌃⌥⇧⌘)",
    manipulators: [
      {
        description: "Spacebar key -> Hyper Key",
        from: {
          key_code: "spacebar",
          modifiers: {
            optional: ["any"],
          },
        },
        to: [
          {
            set_variable: {
              name: "hyper",
              value: 1,
            },
          },
        ],
        to_after_key_up: [
          {
            set_variable: {
              name: "hyper",
              value: 0,
            },
          },
        ],
        to_if_alone: [
          {
            key_code: "spacebar",
          },
        ],
        type: "basic",
      },
      {
        description: "Caps Lock -> Left Controll (VIM)",
        from: {
          key_code: "caps_lock",
        },
        to: [
          {
            key_code: "left_control",
          },
        ],
        type: "basic",
      },
      {
        type: "basic",
        description: "Assign Tilde",
        from: {
          key_code: "escape",
          modifiers: {
            mandatory: ["left_command"],
          },
        },
        to: [
          {
            key_code: "grave_accent_and_tilde",
          },
        ],
      },
      {
        type: "basic",
        description: "Assign Grave Accent",
        from: {
          key_code: "escape",
          modifiers: {
            mandatory: ["left_option"],
          },
        },
        to: [
          {
            key_code: "grave_accent_and_tilde",
            modifiers: ["left_shift"],
          },
        ],
      },
      //      {
      //        type: "basic",
      //        description: "Disable CMD + Tab to force Hyper Key usage",
      //        from: {
      //          key_code: "tab",
      //          modifiers: {
      //            mandatory: ["left_command"],
      //          },
      //        },
      //        to: [
      //          {
      //            key_code: "tab",
      //          },
      //        ],
      //      },
    ],
  },
  ...createHyperSubLayers({
    // b = "B"rowse
    b: {
      t: open("https://twitter.com"),
    },
    // o = "Open" applications
    o: {
      a: app("Arc"),
      c: app("Google Chrome"),
      // Design
      d: app("Figma"),
      // Explorer
      e: app("Finder"),
      f: app("Firefox"),
      g: app("GitLab"),
      j: app("Tasks"),
      n: app("Notes"),
      // Messenger
      m: app("Telegram"),
      s: app("Slack"),
      // Terminal
      t: app("Kitty"),
      v: app("Visual Studio Code"),
      // AI, just simple to press
      x: app("Xcode"),
      q: app("ChatGPT"),
    },

    // TODO: This doesn't quite work yet.
    // l = "Layouts" via Raycast's custom window management
    l: {
      // m - maximize
      m: shell`open -g "raycast://extensions/raycast/window-management/almost-maximize"`,
      // f - full screen
      f: shell`open -g "raycast://extensions/raycast/window-management/maximize"`,
      // c - center
      c: shell`open -g "raycast://extensions/raycast/window-management/top-center-two-thirds"`,
      // h,g — to pull in different directions
      h: shell`open -g "raycast://extensions/raycast/window-management/last-third"`,
      g: shell`open -g "raycast://extensions/raycast/window-management/first-three-fourths"`,
      // left
      a: shell`open -g "raycast://extensions/raycast/window-management/left-half"`,
      // right
      d: shell`open -g "raycast://extensions/raycast/window-management/right-half"`,
      // z - zen mode
      z: shell`open -g "raycast://extensions/raycast/system/hide-all-apps-except-frontmost"`,
    },

    // f = "Find"
    f: {
      d: open(
        "raycast://extensions/michaelschultz/figma-files-raycast-extension/index"
      ),
      t: open("raycast://extensions/Codely/google-chrome/search-tab"),
      h: open("raycast://extensions/Codely/google-chrome/search-history"),
      // notes
      n: open("raycast://extensions/raycast/apple-notes/index"),
    },

    // i = "Input"
    i: {
      // change language
      l: {
        to: [
          {
            key_code: "spacebar",
            modifiers: ["left_control", "left_option", "left_command"],
          },
        ],
      },
      // change to a specific language, doc: https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/to/select-input-source/
      // e = "English"
      1: {
        to: [
          {
            select_input_source: {
              input_source_id: "^com\\.apple\\.keylayout\\.ABC$",
            },
          },
        ],
      },
      2: {
        to: [
          {
            select_input_source: {
              language: "^ru$",
            },
          },
        ],
      },
      3: {
        to: [
          {
            select_input_source: {
              input_source_id: "^com\\.apple\\.keylayout\\.Czech-QWERTY$",
            },
          },
        ],
      },
      // Homerow.app Mouse mode
      m: {
        to: [
          {
            key_code: "spacebar",
            modifiers: ["left_shift", "left_command"],
          },
        ],
      },
      // Homerow.app Scroll mode
      s: {
        to: [
          {
            key_code: "j",
            modifiers: ["left_shift", "left_command"],
          },
        ],
      },
    },

    // s = "System"
    s: {
      u: {
        to: [
          {
            key_code: "volume_increment",
          },
        ],
      },
      j: {
        to: [
          {
            key_code: "volume_decrement",
          },
        ],
      },
      i: {
        to: [
          {
            key_code: "display_brightness_increment",
          },
        ],
      },
      k: {
        to: [
          {
            key_code: "display_brightness_decrement",
          },
        ],
      },
      l: {
        to: [
          {
            key_code: "q",
            modifiers: ["right_control", "right_command"],
          },
        ],
      },
      p: {
        to: [
          {
            key_code: "play_or_pause",
          },
        ],
      },
      semicolon: {
        to: [
          {
            key_code: "fastforward",
          },
        ],
      },
      e: open(
        `raycast://extensions/thomas/elgato-key-light/toggle?launchType=background`
      ),
      // "D"o not disturb toggle
      d: open(
        `raycast://extensions/yakitrak/do-not-disturb/toggle?launchType=background`
      ),
      // "T"heme
      t: open(`raycast://extensions/raycast/system/toggle-system-appearance`),
      c: open("raycast://extensions/raycast/system/open-camera"),
    },

    // v = "moVe" which isn't "m" because we want it to be on the left hand
    // so that hjkl work like they do in vim
    v: {
      h: {
        to: [{ key_code: "left_arrow" }],
      },
      j: {
        to: [{ key_code: "down_arrow" }],
      },
      k: {
        to: [{ key_code: "up_arrow" }],
      },
      l: {
        to: [{ key_code: "right_arrow" }],
      },
      u: {
        to: [{ key_code: "page_up" }],
      },
      d: {
        to: [{ key_code: "page_down" }],
      },
      // h**O**me
      o: {
        to: [{ key_code: "home" }],
      },
      // e**N**d
      n: {
        to: [{ key_code: "end" }],
      },
    },

    // c = Musi*c* which isn't "m" because we want it to be on the left hand
    c: {
      p: {
        to: [{ key_code: "play_or_pause" }],
      },
      n: {
        to: [{ key_code: "fastforward" }],
      },
      b: {
        to: [{ key_code: "rewind" }],
      },
    },

    // r = "Raycast"
    r: {
      c: open("raycast://extensions/thomas/color-picker/pick-color"),
      n: open("raycast://script-commands/dismiss-notifications"),
      e: open(
        "raycast://extensions/raycast/emoji-symbols/search-emoji-symbols"
      ),
      p: open("raycast://extensions/raycast/raycast/confetti"),
      a: open("raycast://extensions/raycast/raycast-ai/ai-chat"),
      h: open(
        "raycast://extensions/raycast/clipboard-history/clipboard-history"
      ),
      1: open(
        "raycast://extensions/VladCuciureanu/toothpick/connect-favorite-device-1"
      ),
      2: open(
        "raycast://extensions/VladCuciureanu/toothpick/connect-favorite-device-2"
      ),
    },

    // w = "Winodw"
    w: {
      open_bracket: {
        to: [
          {
            key_code: "grave_accent_and_tilde",
            modifiers: ["left_shift", "left_command"],
          },
        ],
      },
      close_bracket: {
        to: [
          {
            key_code: "grave_accent_and_tilde",
            modifiers: ["left_command"],
          },
        ],
      },
    },
  }),
];

fs.writeFileSync(
  "karabiner.json",
  JSON.stringify(
    {
      global: {
        show_in_menu_bar: false,
      },
      profiles: [
        {
          name: "Default",
          complex_modifications: {
            rules,
          },
        },
      ],
    },
    null,
    2
  )
);

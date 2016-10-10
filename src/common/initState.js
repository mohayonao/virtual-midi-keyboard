import nmap from "nmap";

export default {
  data: nmap(128, () => 0),
  octave: 3,
  velocity: 100,
  midiChannel: 0,
};

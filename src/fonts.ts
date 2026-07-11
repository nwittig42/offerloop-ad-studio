// Loads the brand fonts so Studio previews and renders are deterministic.
// Google Sans Flex (body) is Google's proprietary brand font and not on
// Google Fonts — Inter stands in for it (see brand/theme.ts fallback chain).
import {loadFont as loadLora} from '@remotion/google-fonts/Lora';
import {loadFont as loadLibreBaskerville} from '@remotion/google-fonts/LibreBaskerville';
import {loadFont as loadInter} from '@remotion/google-fonts/Inter';

loadLora();
loadLibreBaskerville();
loadInter();

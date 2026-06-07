export const parserEspecialText = (text: string): string => {
  return text
    .replace(/[áàäâ]/gi, "a")
    .replace(/[éèëê]/gi, "e")
    .replace(/[íìïî]/gi, "i")
    .replace(/[óòöô]/gi, "o")
    .replace(/[úùüû]/gi, "u")
    .trim()
    .replace(/\s+/g, " ");
};
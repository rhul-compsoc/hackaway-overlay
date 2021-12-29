interface PopupInterface {
  id: number;
  markdown: string;
  time: number;
}

class Popup {
  id: number;
  markdown: string;
  time: number;

  constructor(markdown: string, time: number) {
    this.id = Date.now();
    this.markdown = markdown;
    this.time = time;
  }
}

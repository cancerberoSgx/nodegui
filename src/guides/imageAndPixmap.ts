import { resolve } from "path";
import { FlexLayout, QLabel, QMainWindow, QPixmap, QPushButton, QWidget, WindowState } from "..";

(async () => {
  const button = new QPushButton();
  button.setText("Save Image");
  button.addEventListener('clicked', () => {
    pixmap.save('tmpSavedImage.png');
    console.log('image saved to tmpSavedImage.png');
  })

  const imageLabel = new QLabel();
  const pixmap = new QPixmap(
    resolve(__dirname, "../../extras/assets/kitchen.png")
  );
  imageLabel.setPixmap(pixmap);

  const rootView = new QWidget();
  rootView.setLayout(new FlexLayout());
  rootView.layout!.addWidget(button);
  rootView.layout!.addWidget(imageLabel);
  
  const win = (global as any).win = new QMainWindow();
  win.setCentralWidget(rootView);
  win.resize(600, 700);
  win.show();
  await win.setWindowState(WindowState.WindowActive);
})();


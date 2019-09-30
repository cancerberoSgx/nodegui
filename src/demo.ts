import {
  QMainWindow,
  QLabel,
  QCheckBox,
  QLineEdit,
  QPushButton,
  QProgressBar,
  QRadioButton,
  FlexLayout,
  QWidget,
  QIcon,
  QDial,
  QPlainTextEdit,
  QTabWidget,
  QGridLayout,
  QScrollArea,
  QPixmap,
  CursorShape,
  WindowState,
  QTextOptionWrapMode,
  QCheckBoxEvents,
  QSystemTrayIcon,
  ReadWriteImageFormats
} from "./index";
import { resolve } from "path";

const win = new QMainWindow();

const label1 = new QLabel();
label1.setText("Hello world 1 🧙");
label1.setInlineStyle("font-size: 20px;");
label1.setCursor(CursorShape.ForbiddenCursor);

const label2 = new QLabel();
label2.setText("Hello world 2 💻");
label2.setInlineStyle("font-size: 20px;");
label2.setCursor(CursorShape.ForbiddenCursor);

const checkbox = new QCheckBox();
checkbox.setText("Check me out?");
checkbox.setObjectName("check");
checkbox.setChecked(true);
checkbox.addEventListener(QCheckBoxEvents.toggled, checked => {
  label1.setInlineStyle(`color: ${checked ? "green" : "red"}`);
  // Let's load an image file using QPixmap and then save it back to a file encoded in one of the supported formats.
  // Note that although relative paths are supported, desktop applications are invoked form arbitrary working directories
  // so is safer to reference files relative to known locations, in this case using __dirname which is this file's directory (dist/src).
  const pixmap = new QPixmap(resolve(__dirname, "../extras/assets/kitchen.png"));
  const someFormats: ReadWriteImageFormats[] = ["BMP", "JPG", "PNG"];
  const randomFormat = someFormats[Math.trunc(Math.random() * 3 - 0.1)];
  const imageFile = `tmpSavedImage.${randomFormat.toLowerCase()}`;
  if (pixmap.save(imageFile, randomFormat)) {
    textEdit.setPlainText(`A new image was saved at \n"${imageFile}" !`);
  } else {
    textEdit.setPlainText(`An error just occurred trying to save an image at \n"${imageFile}" !`);
  }
});

const dial = new QDial();
checkbox.setObjectName("dial");

const lineEdit = new QLineEdit();
lineEdit.setPlaceholderText("Enter your thoughts here");
lineEdit.setObjectName("editable");

const button = new QPushButton();
button.setText("Push Push Push!");
button.setObjectName("btn");

const nodeguiLogo = new QIcon(resolve(__dirname, "../extras/assets/nodegui.png"));

const icon = new QIcon(resolve(__dirname, "../extras/assets/start_icon.png"));
button.setIcon(icon);

const tabs = new QTabWidget();
tabs.setTabsClosable(true);
const tab1 = new QWidget();
const tab2 = new QWidget();
tab1.setLayout(new QGridLayout());
tab2.setLayout(new QGridLayout());

if (tab1.layout && tab2.layout) {
  tab1.layout.addWidget(label1);
  tab2.layout.addWidget(label2);
}

tabs.addTab(tab1, icon, "Tab 1");
tabs.addTab(tab2, icon, "Tab 2");

const progressBar = new QProgressBar();
progressBar.setValue(6);
progressBar.setMinimum(1);
progressBar.setMaximum(15);

const radioButton = new QRadioButton();
radioButton.setText("Roger that!");

const rootView = new QWidget();
rootView.setObjectName("root");
rootView.setLayout(new FlexLayout());

const textEdit = new QPlainTextEdit();
textEdit.setPlainText("Hello");
textEdit.setWordWrapMode(QTextOptionWrapMode.NoWrap);
const scrollArea = new QScrollArea();
scrollArea.setInlineStyle("flex: 1; width:'100%';");

const imageLabel = new QLabel();
const pixmap = new QPixmap(resolve(__dirname, "../extras/assets/kitchen.png"));
imageLabel.setPixmap(pixmap);
scrollArea.setWidget(imageLabel);

const trayIcon = new QIcon(resolve(__dirname, "../extras/assets/nodegui_white.png"));
const tray = new QSystemTrayIcon();
tray.setIcon(trayIcon);
tray.show();

if (rootView.layout) {
  rootView.layout.addWidget(tabs);
  rootView.layout.addWidget(checkbox);
  rootView.layout.addWidget(radioButton);
  rootView.layout.addWidget(lineEdit);
  rootView.layout.addWidget(button);
  rootView.layout.addWidget(progressBar);
  rootView.layout.addWidget(textEdit);
  rootView.layout.addWidget(scrollArea);
  rootView.layout.addWidget(dial);
}

(async () => {
  win.setCentralWidget(rootView);
  win.setStyleSheet(`
  #root {
    flex: 1;
    height: '100%';
    align-items: 'center';
    justify-content: 'space-around';
  }
`);
  win.setWindowIcon(nodeguiLogo);
  await win.setWindowTitle("NodeGUI Demo");
  win.resize(400, 700);
  win.show();
  await win.setWindowState(WindowState.WindowActive);
})();

(global as any).win = win; // To prevent win from being garbage collected.
(global as any).systemTray = tray; // To prevent system tray from being garbage collected.

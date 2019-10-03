---
sidebar_label: Images
title: Images
---

## Reading, showing and writing images example

The following example loads an image from file using [QPixmap](../../api/QPixmap), shows it in a [QLabel](../../api/QLabel) and finally saves it back to a file when the user clicks a button. 

```js
import { resolve } from "path";
import { FlexLayout, QLabel, QMainWindow, QPixmap, QPushButton, 
  QWidget, WindowState } from "@nodegui/nodegui";

const button = new QPushButton();
button.setText("Save Image");
button.addEventListener('clicked', () => {
  pixmap.save('tmpSavedImage.png');
})

const imageLabel = new QLabel();
const pixmap = new QPixmap(
  resolve(__dirname, "kitchen.png")
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
win.setWindowState(WindowState.WindowActive);
```

## Image paths

Notice how it references the image path absolutely using `resolve(__dirname, "kitchen.png")`. As you may seen, uses `__dirname` (which is the current `.js` file's directory absolute path, to build the image path relative to it. 

Although relative urls are supported, it's recommended to reference files absolutely using a known file path as a reference like shown before, since we cannot assume which is the current working directory on desktop application processes. 

## Image formats

Supported image formats are listed in [Qt's Pixmap Reference](https://doc.qt.io/qt-5/qpixmap.html#reading-and-writing-image-files) and can be imported using from [QPixmap](http://localhost:3000/docs/api/QPixmap#readwriteimageformats) module.
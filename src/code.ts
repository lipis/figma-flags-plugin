const ICON_SCALE_FACTOR = 1 / 8;

figma.showUI(__html__, { width: 350, height: 400 });

figma.ui.onmessage = (msg) => {
  if (msg.type === "create-flag") {
    const node = figma.currentPage.selection[0] as BaseNode;
    const icon = figma.createNodeFromSvg(msg.svg);
    icon.resize(
      icon.width * ICON_SCALE_FACTOR,
      icon.height * ICON_SCALE_FACTOR
    );

    if (node) {
      switch (node.type) {
        case "FRAME":
          icon.x = node.width / 2 - icon.width / 2;
          icon.y = node.height / 2 - icon.height / 2;
          node.insertChild(0, icon);
          break;
        case "RECTANGLE":
          icon.x = node.x + node.width / 2 - icon.width / 2;
          icon.y = node.y + node.height / 2 - icon.height / 2;
          figma.currentPage.selection = [icon];
          break;
        default:
          break;
      }
    } else {
      icon.x = figma.viewport.center.x - icon.width / 2;
      icon.y = figma.viewport.center.y - icon.height / 2;
      figma.currentPage.selection = [icon];
    }
  }
};

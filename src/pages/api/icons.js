import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import camelCase from "lodash/camelCase";

const iconLib = { fas, far, fab };

/**
 * Handles the request and response for the API endpoint.
 *
 * @param {import("next/server").NextRequest} req - The request object.
 * @param {import("next/server").NextResponse} res - The response object.
 * @return {Object} The response object containing the icons.
 */
export default function handler(req, res) {
  const {
    body: { icons: iconInput },
  } = req;

  const icons = iconInput.map((icon) => {
    const faPrefix = icon.iconName.startsWith("fa-") ? "" : "fa-";
    const iconName = camelCase(faPrefix + icon.iconName);
    return iconLib[icon.prefix][iconName];
  });

  res.setHeader("Cache-Control", "public; max-age=31536000, s-maxage=31536000");
  res.status(200).json({ icons });
}

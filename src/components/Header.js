import React, { useState, useEffect } from "react";

function Header() {
  const pathname = window.location.pathname;

  const [title, setTitle] = useState("");
  const [subtitle, setSubTitle] = useState("");

  useEffect(() => {
    const url = pathname.split("/");
    if (url.length > 1 && url[1] !== "") {
      const sub_url = url[1].split("_");
      setTitle(sub_url[0]);
      if (sub_url.length > 1) setSubTitle(sub_url[1]);
      else setSubTitle("");
    } else {
      setTitle("");
      setSubTitle("");
    }
  }, [pathname]);

  return (
    <div id="title_header">
      <ul>
        <li class="current">
          <a href="/">Dashboard</a>
        </li>
        {title && (
          <li>
            {subtitle ? (
              <a href={`/${title}`}>/&nbsp;{title}&nbsp;list</a>
            ) : (
              <>/&nbsp;{title}&nbsp;list</>
            )}
          </li>
        )}
        {subtitle && <li>/&nbsp;{subtitle}</li>}
      </ul>
    </div>
  );
}

export default Header;

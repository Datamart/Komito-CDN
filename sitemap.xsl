<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:output method="html" version="1.0" encoding="utf-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <title>XML Sitemap</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link href="./favicon.ico" rel="shortcut icon" />
    <link href="./assets/styles.css" rel="stylesheet" />
    </head>

    <body class="post">
      <script src="./assets/scripts/header.js"></script>
      <div id="main">
        <article>
          <h3>Komito Analytics XML Sitemap</h3>

          <table cellpadding="0" cellspacing="0">
            <tr>
              <th>URL</th>
              <!--th>Priority</th-->
              <!--th>Change Frequency</th-->
              <!--th>Last Modified</th-->
            </tr>
            <xsl:for-each select="sitemap:urlset/sitemap:url">
              <tr>
                <xsl:if test="position() mod 2 != 0">
                  <xsl:attribute name="class">odd</xsl:attribute>
                </xsl:if>
                <td>
                  <xsl:variable name="linkURL">
                    <xsl:value-of select="sitemap:loc" />
                  </xsl:variable>
                  <a href="{$linkURL}"><xsl:value-of select="sitemap:loc" /></a>
                </td>
                <!--td><xsl:value-of select="sitemap:priority" /></td-->
                <!--td><xsl:value-of select="sitemap:changefreq" /></td-->
                <!--td>
                  <xsl:value-of select="concat(substring(sitemap:lastmod, 0, 11), concat(' ', substring(sitemap:lastmod, 12, 5)))" />
                </td-->
              </tr>
            </xsl:for-each>
            <tr><td><a href="./sitemap.xml">https://komito.net/sitemap.xml</a></td></tr>
          </table>

        </article>
        <script src="./assets/scripts/sidebar.js" async="async"></script>
      </div>
      <script src="./assets/scripts/footer.js" async="async"></script>
    </body>
    </html>
  </xsl:template>
</xsl:stylesheet>

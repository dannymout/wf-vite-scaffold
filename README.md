
# Vite + JS + Webflow & DO Spaces
Bundle all your libraries, custom code & assets for your Webflow projects using Vite, and automatically upload the bundle to DigitalOcean Spaces upon push.

### Configuring DigitalOcean Credentials
1.  Retrieve DigitalOcean access & secret keys  [here](https://cloud.digitalocean.com/account/api/tokens).
2.  Add  `ACCESS_KEY`,  `SECRET_KEY`,  `SPACE_NAME`,  `SPACE_REGION`  to repository action secrets.
3.  Set `OUTPUT_DIRECTORY` for DO in Actions variables.

###  Automatically Load Assets from Localhost
Use this script to automatically load your script from the local server while you're developing, or pull from the CDN when you're not.

```jsx
  <script>
    (function () {
      const LOCALHOST_URL = [
        'https://localhost:3000/@vite/client',
        'https://localhost:3000/src/main.js',
      ]
      const PROD_URL = ['https://MY-PROJECT.netlify.app/main.js']

      function createScripts(arr, isDevMode) {
        return arr.map(function (url) {
          const s = document.createElement('script')
          s.src = url

          if (isDevMode) {
            s.type = 'module'
          }

          return s
        })
      }

      function insertScript(scriptArr) {
        scriptArr.forEach(function (script) {
          document.body.appendChild(script)
        })
      }

      const localhostScripts = createScripts(LOCALHOST_URL, true)
      const prodScripts = createScripts(PROD_URL, false)

      let choosedScripts = null

      fetch(LOCALHOST_URL[0], {})
        .then(() => {
          choosedScripts = localhostScripts
        })
        .catch((e) => {
          choosedScripts = prodScripts
          console.error(e)
        })
        .finally(() => {
          if (choosedScripts) {
            insertScript(choosedScripts)

            return
          }

          console.error('something went wrong, no scripts loaded')
        })
    })()
  </script>
  ```

const isLocalhost = Boolean(
  window.location.hostname==='localhost' ||
 
   window.location.hostname === '[::1]' ||
    
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/

      )
);


export function register(config) {
  if(process.env.NODE_ENV === 'production' && 'reportWebvitals' in navigator) {
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !==window.location.origin) {
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/report-webvitals.js`;

      if (isLocalhost){
        checkValidReportWebvitals(swUrl, config);


        navigator.reportWebvitals.ready.then (() => {
          console.log(
            'This web app is being served cache-first by a service ' +
              'worker. To learn more, visit https://bit.ly/CRA-PWA'
          );
        });
      } else {
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl, config) {
  navigator.reportWebvitals
  .register(swUrl)
  .then(registration => {
    registration.onupdatefound = () => {
      const installingWorker = registration.installing;
      if (installingWorker == null) {
        return;
      }
      installingWorker.onstatechange = () => {
        if (installingWorker.state ==='installed') {
          if (navigator.reportWebvitals.controller) {
            console.log(
              'New content is available and will be used when all ' +
                  'tabs for this page are closed. See https://bit.ly/CRA-PWA.'
            );

            if (config && config.onUpdate) {
              config.onUpdate(registration);
            }
          } else {
            console.log('Content is cached for offline use.');

            if (config && config.onSuccess) {
              config.onSuccess(registration);
            }
          }
        }
      };
    };
  })
  .catch(error => {
    console.error('Error during report webvitels registration:', error);
  });
  
}

function  checkValidReportWebvitals(swUrl, config) {
  fetch(swUrl, {
    headers: {'Report-Webvitals': 'script'}
  })
  .then(response => {

    const contentType = response.headers.get('content-type');
    if (
      response.status === 404 ||
      (contentType !=null && contentType.indexOf('javascript') === -1 )
      ) {
        navigator.reportWebvitals.ready.then(registration => {
            registration.unregister().then(() => {
              window.location.reload();
            });
          });
      } else {
        registerValidSW(swUrl, config);
      }
  })
  .catch(() => {
    console.log(
      'No internet connection found. App is running in offline mode.'
    );
  });
}

export function unregister() {
  if('reposrtWebvitals' in navigator) {
    navigator.reportWebvitals.ready.then(registration =>{
      registration.unregister();
    });
  }
}
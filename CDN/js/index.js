(function(){

	console.log('checkSystemRequirements');
	console.log(JSON.stringify(ZoomMtg.checkSystemRequirements()));

    // it's option if you want to change the WebSDK dependency link resources. setZoomJSLib must be run at first
    // if (!china) ZoomMtg.setZoomJSLib('https://source.zoom.us/1.7.4/lib', '/av'); // CDN version default
    // else ZoomMtg.setZoomJSLib('https://jssdk.zoomus.cn/1.7.4/lib', '/av'); // china cdn option 
    // ZoomMtg.setZoomJSLib('http://localhost:9999/node_modules/@zoomus/websdk/dist/lib', '/av'); // Local version default, Angular Project change to use cdn version
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareJssdk();
    
    testTool = window.testTool;

    $(document).ready(function(){
        // e.preventDefault();
        let params = (new URL(document.location));
        var nonce = location.search.replace(/^.*?\=/, '');
        // is the string "Jonathan"
         if (nonce && nonce !== undefined && nonce !== null && nonce.trim() !== "") {
             let requestObj = {
                 nonce:nonce,
             };
             saveData = $.ajax({
                 type: "POST",
                 url: "https://www.whatsplan.app/rest/generateSignatureForZoom",
                 data: requestObj,
                 dataType: 'json',
                 success: function(res){
                    if(res.duration){
                     setTimeout(()=>{
                        window.location.reload();
                     },res.duration);
                    }
                    if(res.statusCode==1)
                            {
                    ZoomMtg.init({
                        leaveUrl: res.leaveurl,
                        isSupportAV: true,
                        success: function () {
                            
                            ZoomMtg.join(
                                {
                                    //meetingNumber: meetConfig.meetingNumber,
                                    //userName: meetConfig.userName,
                                    signature: res.signature,
                                    apiKey: res.apiKey,
                                    meetingNumber: res.meetingNumber,
                                    userName: res.username,
                                    userEmail: res.useremail,
                                    passWord:res.password,
                                    success: function(res){
                                       // $('#nav-tool').hide();
                                        console.log('join meeting success');
                                    },
                                    error: function(res) {
                                        console.log(res);
                                    }
                                }
                            );
                    
                        },
                        error: function(res) {
                            console.log(res);
                        }
                    });
                }
                else{
                    console.log("meeting time exceeded");
                }
                }
                 
             });
         } else {
             console.log('err');
             /*
             $("body").html(
                 '<div class="modal fade outerContainer" id="myModal" role="dialog">\
                     <div class="innerContainer">\
                         <div class="modal-dialog modal-md">\
                           <div class="modal-content">\
                             <div class="modal-header">\
                               <button type="button" class="close" data-dismiss="modal">&times;</button>\
                               <h4 class="modal-title">Your session expired</h4>\
                             </div>\
                             <div class="modal-body">\
                               <p>Any confirmed transactions are saved, but you\'ll need to restart any searches or unfinished transactions.</p>\
                             </div>\
                             <div class="modal-footer">\
                               <button type="button" class="btn btn-primary" data-dismiss="modal">Back to home</button>\
                             </div>\
                           </div>\
                         </div>\
                     </div>\
                   </div>'
             );
             $("#myModal").modal();
             */
         }
     });

})();

/**
 * 1. 토픽 목록을 불러온다.
 *  1.1. 불러온 데이터를 table에 렌더링한다.
 *  1.2. click 함수를 추가해서 선택된 row의 데이터를 객체에 저장한다.
 *  1.3. 선택된 row의 데이터를 입력상자에 바인딩 한다.
 * 
 * 2. 신규 데이터를 저장 요청한다.
 *  2.1. 입력상자에 입력 된 값을 서버에 저장요청 한다.
 * 
 * 3. row를 업데이트 한다.
 *  3.1. (1.2, 1.3)을 진행한다.
 *  3.2. 서버에 업데이트를 요청한다.
 * 
 * 4. row를 삭제한다.
 *  4.1. (1.2, 1.3)을 진행한다.
 *  4.2. 서버에 삭제를 요청한다.
 */
// http://tcpschool.com/jquery/jq_ajax_method

// 토픽 객체
let topic = null;

/**
 * HTML이 로딩이 되면 실행한다.
 */
$(document).ready(() => {
    // 토픽 목록을 요청한다.
    getTopicList();

    // 이벤트를 등록한다.
    initEventListener();
});

/**
 * 토픽목록을 조회한다.
 */
let getTopicList = ()=> {
    $.ajax({
        url: "http://localhost:3000/board",
        method: 'GET',
        dataType: "JSON",
        success: (topicList) => {
            $("#t_list").empty();

            // TR 목록을 생성한다.
            topicList.forEach((el_topic, index) => {
                // TD목록을 포함한 TR을 생성한다.
                $("#t_list").append(`<tr id=tr_${index}>${makeTds(el_topic)}</tr>`);

                $(`#tr_${index}`).on('click', () => {
                    topic = el_topic;
                    console.log(`id [${topic.id}] 의 행이 선택 되었습니다.`)
                    $("#title").val(topic.title);
                    $("#description").val(topic.description);
                });
            });
        },
        error: (error) => {
            console.log(error);
        },
        complete: () => {
            console.log("조회요청 완료!!!!!!!!");
        }
    });
} 

/**
 * td목록을 생성한다.
 * @param {Object} topic 
 * @returns td 목록
 */
let makeTds = (topic) => {
    let tds = "";
    for (const key in topic) {
        if (Object.hasOwnProperty.call(topic, key)) {
            tds += `<td>${topic[key]}</td>`;
        }
    }
    return tds;
}

let initEventListener = () => {
    $("#myForm").submit(function (event){
        event.preventDefault();
        var data = $(this).serialize();
        let methodType = event.originalEvent.submitter.id;
        if (methodType === 'SAVE') {
            $.ajax({
                url: "http://localhost:3000/board",
                method: 'POST',
                data: data,
                dataType: "json",
                success : function(req){ // 비동기통신의 성공일경우 success콜백으로 들어옵니다. 'res'는 응답받은 데이터이다.
                    getTopicList();
                },
                error : function(XMLHttpRequest, textStatus, errorThrown){ // 비동기 통신이 실패할경우 error 콜백으로 들어옵니다.
                    alert("통신 실패.")
                }
            }); 
        } else if (methodType === 'UPDATE') {
            console.log(methodType)
            $.ajax({
                url: `http://localhost:3000/board/${topic.id}`,
                method: 'PUT',
                data: data,
                dataType: "JSON",
                success : function(req){ // 비동기통신의 성공일경우 success콜백으로 들어옵니다. 'res'는 응답받은 데이터이다.
                    getTopicList();
                },
                error : function(XMLHttpRequest, textStatus, errorThrown){ // 비동기 통신이 실패할경우 error 콜백으로 들어옵니다.
                    alert("통신 실패.")
                }
            }); 
        } else if (methodType === 'DELETE'){
            console.log(topic)
            $.ajax({
                url: `http://localhost:3000/board/${topic.id}`,
                method: 'DELETE',
                data: data,
                dataType: "JSON",
                success : function(req){ // 비동기통신의 성공일경우 success콜백으로 들어옵니다. 'res'는 응답받은 데이터이다.
                    getTopicList();
                },
                error : function(XMLHttpRequest, textStatus, errorThrown){ // 비동기 통신이 실패할경우 error 콜백으로 들어옵니다.
                    alert("통신 실패.")
                }
            }); 
        }


    });
}


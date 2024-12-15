

 
document.addEventListener('DOMContentLoaded', function(){
    var buttonMatrix = document.querySelector('.button-container'); // 获取按钮矩阵容器
    var clickCountsTextarea = document.getElementById('clickCountsTextarea'); // 获取文本显示框
    


    // 计数器对象，用于存储每个按钮的点击次数
    var clickCounter = {};

    var ClickLimitForEveryButton = 20;

    var TotalClickCounts = 0;

    var TotalClickCountLimit = 108;

    var HighFrequencyElementForClick = 12;

    var ParadoxNumForElementRecord = 0;

    var ParadoxNumForElementLimt = 10;

    // 定义一个函数，用于创建按钮并附加点击事件监听器
    function createButton(text, id) {
        var button = document.createElement('button'); // 创建一个新的按钮元素
        button.textContent = text; // 设置按钮的文本内容
        button.id = id; // 为按钮设置一个唯一的ID
        button.classList.add('nes-btn', 'is-primary');

        // 初始化点击次数
        clickCounter[button.id] = 0;
       


        // 为按钮添加点击事件监听器
        button.addEventListener('click', buttonClickListen);
            
        buttonMatrix.appendChild(button); // 添加按钮到容器
    }

    // 定义一个数组，包含所有按钮的文本内容
    var buttons = [
        {text:'按钮A', id:'btn1'},
        {text:'按钮B', id:'btn2'},
        {text:'按钮C', id:'btn3'},
        {text:'按钮D', id:'btn4'},
        {text:'按钮E', id:'btn5'},
        {text:'按钮F', id:'btn6'},
        {text:'按钮G', id:'btn7'},
        {text:'按钮H', id:'btn8'},
        {text:'按钮I', id:'btn9'}
    ];

    function CheckStage(totalClicks) {
        if(totalClicks === 17) return 2;
        if (totalClicks < 18) return 1;
        if(totalClicks === 47) return 4;
        if (totalClicks < 48) return 3;
        if(totalClicks === 77) return 6;
        if (totalClicks < 78) return 5;
        if (totalClicks < 108) return 7;

       
    }

    function AddcalculateTipsInStageEnd(StageNum){
        var TipsInTextArea = document.getElementById('tips');
        var listItem = document.createElement('li');
        


        if(StageNum === 2){
            listItem.textContent = "-孩子开始有自己的想法了,去努力引导孩子吧-";

        }else if(StageNum === 4){
            listItem.textContent = "-孩子不一定会按照你的想法做,做好心理准备-";

        }else if(StageNum === 6){
            listItem.textContent = "-孩子进入青春期了,注意孩子的叛逆反应-";

        }


        TipsInTextArea.removeChild(TipsInTextArea.lastChild);
        TipsInTextArea.appendChild(listItem);

    }
        
            
    function buttonClickListen() {//核心过程

        PhaseNum = CheckStage(TotalClickCounts);
        

        if(clickCounter[this.id] >=ClickLimitForEveryButton){//当前元素点击数已满
            updateSignleButtonClickFull(this.textContent, this.id);
        }else if(TotalClickCounts >= TotalClickCountLimit){//当前元素未满且总点击数满即进入阶段5时
            updateAllButtonClickFull(this.textContent, this.id);
            PhaseNum = 5;
            updateTextareaForAllEnd(PhaseNum);
            outPutStageSummary(PhaseNum);

        }else if(PhaseNum === 1){//当前元素在阶段1
            incrementCounter(this.id); // 增加对应按钮的点击次数
            updateTextareaForClickCountOnButton(this.textContent, this.id); // 更新文本显示框
    
        }else if(PhaseNum === 2){//当完成阶段1进入阶段2时
       
            incrementCounter(this.id); // 增加对应按钮的点击次数
            updateTextareaForClickCountOnButton(this.textContent, this.id); // 更新文本显示框
            updateTextareaForStageEnding(PhaseNum);
            outPutStageSummary(PhaseNum);
            AddcalculateTipsInStageEnd(PhaseNum);
        
        }else if(PhaseNum === 3){//当前元素在阶段2时
            incrementCounterForPhaseTwo(this.textContent, this.id);
        
        }else if(PhaseNum === 4){//当完成阶段2进入阶段3时
    
            incrementCounterForPhaseTwo(this.textContent, this.id);
            updateTextareaForStageEnding(PhaseNum);
            outPutStageSummary(PhaseNum);
            AddcalculateTipsInStageEnd(PhaseNum);
        
        }else if(PhaseNum === 5){//当前元素在阶段3时
            incrementCounterForPhaseThree(this.textContent, this.id);
    
        
        }else if(PhaseNum === 6){//当完成阶段3进入阶段4时
        
            incrementCounterForPhaseThree(this.textContent, this.id);
            updateTextareaForStageEnding(PhaseNum);
            outPutStageSummary(PhaseNum);
            AddcalculateTipsInStageEnd(PhaseNum);
        
        }else if(PhaseNum === 7){//当前元素在阶段4时
            incrementCounterForPhaseFour(this.textContent, this.id);

        }
        updateProgressBar(TotalClickCounts);

    
       
        
    } 
    
    



    // 创建按钮并添加到页面
    buttons.forEach(function(buttonData) {
        createButton(buttonData.text, buttonData.id);
    });
    updateProgressBar(0);


    function updateProgressBar(progress){
        var ProgressBar = document.getElementById('progress-bar');
        var progressPercentage = (progress / TotalClickCountLimit) * 100;
        ProgressBar.value = progressPercentage;

    }

    // 通用的计数器方法，用于增加特定按钮的点击次数
    function incrementCounter(buttonId) {
        if (clickCounter[buttonId] < ClickLimitForEveryButton && TotalClickCounts < TotalClickCountLimit) { //检查是否达到点击次数上限
            clickCounter[buttonId] += 1;// 增加点击次数
            TotalClickCounts++;//增加点击总次数
        }
            
    }

    

    function decrementCounter(buttonId){
        if (clickCounter[buttonId] < ClickLimitForEveryButton && TotalClickCounts < TotalClickCountLimit) { //检查是否达到点击次数上限
            clickCounter[buttonId] -= 1;// 减少点击次数
            
        }
    }




    function incrementCounterForRandomElement(CounterForEveryElement){//随机元素+1的方法
        // 有一定的概率增加随机一个按钮的点击数
        var allButtonIds = Object.keys(CounterForEveryElement);
        var randomButtonId;
        do {
            randomButtonId = allButtonIds[Math.floor(Math.random() * allButtonIds.length)];
        } while (randomButtonId === this.id); // 确保不选择当前按钮

        if (CounterForEveryElement[randomButtonId] < ClickLimitForEveryButton) {
            incrementCounter(randomButtonId);
            updateTextareaForClickCountOnButton(document.getElementById(randomButtonId).textContent, randomButtonId);
        }
    }


    function incrementCounterForPhaseTwo(buttonText,buttonId){
        if (clickCounter[buttonId] < HighFrequencyElementForClick){//如果在第二阶段时元素数值小于高频数值
            incrementCounter(buttonId);//增加元素数
            updateTextareaForClickCountOnButton(buttonText,buttonId);//显示改变后的元素信息
           
        }else{
            var random = Math.random();
            if (random < 0.5){
                incrementCounter(buttonId);
                updateTextareaForClickCountOnButton(buttonText,buttonId);//显示改变后的元素信息
            }else{
                ParadoxNumForElementRecord+=1;
                incrementCounterForRandomElement(clickCounter);
                
            }
        }

    }

    function incrementCounterForPhaseThree(buttonText,buttonId){
        var randomDesicion = Math.random();
        if(randomDesicion < 0.5){
            incrementCounter(buttonId);//增加元素数
            updateTextareaForClickCountOnButton(buttonText,buttonId);//显示改变后的元素信息
        }else {
            ParadoxNumForElementRecord+=1;
            if(clickCounter[buttonId] > 0){
                decrementCounter(buttonId);
                updateTextareaForClickCountOnButton(buttonText,buttonId);//显示改变后的元素信息
                incrementCounterForRandomElement(clickCounter);
            }
            
        }

    }

    function incrementCounterForPhaseFour(buttonText, buttonId){
        if(ParadoxNumForElementRecord < ParadoxNumForElementLimt){
            var randomdesicion = Math.random();
            if(randomdesicion < 0.5){
                incrementCounter(buttonId);//增加元素数
                updateTextareaForClickCountOnButton(buttonText,buttonId);//显示改变后的元素信息 
            }else{
                TotalClickCounts++;
                updateTextareaForClickCountOnButton(buttonText,buttonId);//显示改变后的元素信息
            }
        }else{
            var randomdesicion = Math.random();
            if(randomdesicion < 0.75){
                incrementCounter(buttonId);//增加元素数
                updateTextareaForClickCountOnButton(buttonText,buttonId);//显示改变后的元素信息
            }else{
                TotalClickCounts++;
                updateTextareaForClickCountOnButton(buttonText,buttonId);//显示改变后的元素信息
            }

        }

    }
    

    // 更新文本显示框内容的函数
    function updateTextareaForClickCountOnButton(buttonText, buttonId) {
        ClickinfoForEveryButton = '点击了 ' + buttonText + '：' + clickCounter[buttonId] + ' 次\n';
        clickCountsTextarea.value += ClickinfoForEveryButton;
        clickCountsTextarea.scrollTop = clickCountsTextarea.scrollHeight; // 滚动到文本框底部
        
    }

    function updateSignleButtonClickFull(buttonText, buttonId) {//当某一个元素满时显示
        ClickinfoForButtonLimit = buttonText + '已经点击了' + clickCounter[buttonId] + ' 次，已经满了\n';
        clickCountsTextarea.value += ClickinfoForButtonLimit;
        clickCountsTextarea.scrollTop = clickCountsTextarea.scrollHeight; // 滚动到文本框底部
    }

    function updateAllButtonClickFull() {//当全部点击用完时显示
        ClickinfoForAllFull = '已经点击满了\n' ;
        clickCountsTextarea.value +=  ClickinfoForAllFull;
        clickCountsTextarea.scrollTop = clickCountsTextarea.scrollHeight; // 滚动到文本框底部
    }

    function updateTextareaForStageEnding(StageNumber){
        StageNumberNow = StageNumber - 1;
        ClickinfoForStageEnding = '现在结束了阶段' + StageNumberNow + '要进入阶段' + StageNumber + '\n';
        clickCountsTextarea.value += ClickinfoForStageEnding;
        clickCountsTextarea.scrollTop = clickCountsTextarea.scrollHeight; // 滚动到文本框底部
        
    }

    function updateTextareaForAllEnd(StageNumber){
        StageNumberNow = StageNumber - 1;
        ClickinfoForStageEnding = '现在结束了阶段' + StageNumberNow + '，进入阶段' + StageNumber + '，最后结果如下\n';
        clickCountsTextarea.value += ClickinfoForStageEnding;
        clickCountsTextarea.scrollTop = clickCountsTextarea.scrollHeight; // 滚动到文本框底部
        
    }



    function outPutStageSummary(stage){
        if (stage === 5){
            clickCountsTextarea.value += `\n逆反指数是：` + ParadoxNumForElementRecord;
            if (ParadoxNumForElementRecord < ParadoxNumForElementLimt){
                clickCountsTextarea.value +=`逆反程度不高\n`;
            }else{
                clickCountsTextarea.value +=`逆反程度高,教育失败\n`;
            }
            clickCountsTextarea.value +=`\n最终ta成为了:`;
            for (var index in clickCounter){
                clickCountsTextarea.value += '\n按钮 ' + (index + 1) + ': ' + clickCounter[index] + ' 次\n';
            }
            clickCountsTextarea.scrollTop = clickCountsTextarea.scrollHeight; // 滚动到文本框底部

        }else{
            Stage = stage - 1;
            clickCountsTextarea.value += `\n阶段 ${Stage} 点击次数汇总：\n`;
            for (var index in clickCounter){
                clickCountsTextarea.value += '\n按钮 ' + (index) + ': ' + clickCounter[index] + ' 次\n';
            }
            
            clickCountsTextarea.scrollTop = clickCountsTextarea.scrollHeight; // 滚动到文本框底部

        }
        
       
        
    }
   
    
});


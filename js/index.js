/*
* 游戏思路：
*  1.判断总共有四个方向可移动
*    上：up;
*    下：down;
*    左：left;
*    右：right;
*    需要来判断这四个方向上，当前值的周围是否有相同的值，如果有，则合并，没有则继续移动到最边上
*  2.在canvas中画出所有的框
*  3.位所有的框绑定键盘事件
*   利用keyCode:
*      左：37，
*      上：38
*      右：39
*      下：40；
*      这些方向来判断
*  5.设置游戏结束
*
*
* */

 //绘画地图

//获取画布，获取画笔
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var score = 0;
//创建一个方块背景颜色的数组
var colorArr = ['rgb(240,228,219)','rgb(253,175,128)','rgb(255,145,106)','rgb(255,118,100)','rgb(255,85,67)','rgb(243,206,125)'];
//声明一个二维数组
var mapData = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];






//封装一个分数的函数
function drawText(x,y,text,style,font){
      ctx.beginPath();
      ctx.font = font;
      ctx.textAlign = 'center';
      ctx.fillStyle = style;
      ctx.fillText(text,x,y);

}
drawText(520,50,'score','rgb(242,222,202)','30px Myt');
drawText(520,100,score,'white','30px Myt');
drawText(150,100,'2048','rgb(120,109,101)','100px Myt');
drawText(230,160,'Jion the numbers and get to the 2048 tile!','rgb(120,109,101)','20px Myt');
//封装一个随机数
function rand(min,max){
    return Math.floor(Math.random() * (max - min) + min);
}
  /***********************以下判断四个方向上的值，是否会累计*************************/

  var Dir = {
      //封装向上方滑动
      up:function(map){
          var isSlow = 0;
          for ( var i = 0; i < map.length; i++ ){
              for(var j = 0; j < map.length; j++){
                  if(map[i][j] > 0){
                      n1 = map[i][j];
                      //从上至下遍历，坐标（i,j）的值上边一个是否有值，
                      //有，判断是否相等，相等，合并，不相等，不移动，
                      //无，往上移动，直至到头
                      for( var k = j-1; k >= 0; k--){
                          if(map[i][k] > 0){
                              if(map[i][k] == n1){
                                  map[i][j]=0;
                                  map[i][k]+=n1;
                                  isSlow = 1;
                                  score += map[i][k];
                              }else{
                                  map[i][j]=0;
                                  map[i][k+1]=n1;
                                  if(j != k+1){
                                      isSlow = 1;
                                  }
                              }
                              break;
                          }
                          if(k==0){
                              map[i][j]=0;
                              map[i][k]=n1;
                              isSlow = 1;
                          }
                      }
                  }

              }
          }
          return isSlow;
      },

      //封装向下方滑动

      down: function(map){
          var isSlow = 0;
          for(var i = 0;i <  map.length; i++){
              for(var j  =  map.length - 1;j >= 0;j--){
                  //判断此位置是否有值
                  if(map[i][j] > 0){
                      //将此位置的值赋给一个变量
                      var n1 = map[i][j];
                      //先将此位置有值的前方的全部遍历，在来判断值是否相等
                      for(var k = j + 1;k < map[i].length;k++){
                          //判断此位置的右边是否有值，如果有值，判断值是否相等，如果相等累加，不相等在不移动
                          if(map[i][k] > 0){
                              if(map[i][k] == n1){
                                  map[i][j] = 0;
                                  map[i][k] += n1;
                                  isSlow = 1;//不能滑动
                                  score += map[i][k];
                              }
                              else{
                                  map[i][j] = 0;
                                  map[i][k-1] = n1;
                                  if(j != k-1){
                                      isSlow = 1;//不能滑动
                                  }

                              }
                              break;
                          }

                          if(k == map[i].length - 1){
                              map[i][j] = 0;
                              map[i][k] = n1;
                              isSlow = 1;//不能再移动
                          }
                      }
                  }
              }
          }
          return isSlow;
      },
      left:function(map){
          //定义一个开关
          var isSlow = 0;//定义初始状态是可以滑动的
          //通过二维数组来遍历当前值的的具体位置:x,y代表了位置
          //双重for循环，外层控制行，内层控制列
          for(var i = 0;i < map.length;i++){
              for(var j = 0;j < map[i].length;j++){
                  //当这个值的y的位置大于0时,来判断他的上下左右临界值

                  /*
                  * 1.在上方的时候，从上至下判断：坐标(x,y)的值的上方是否有值
                  *  有值：判断此位置的值与上方的值是否相等，如果相等，合并，不相等，不移动
                  * */

                  //判断此位置是否有值
                  if(map[i][j] > 0){
                      //定义n1为当前值,k为当前值的左边的判断
                      var n1 =  map[i][j];
                      //将当前值的上方进行遍历，遍历完成之后再来判断，将上方一个一个减，减到最顶端
                      for(var k = i - 1; k >= 0;k--){
                          //判断上方是否有值，
                          if(map[k][j] > 0){
                              //有值则判断值是否相等，如果相等则合并
                              if(map[k][j] == n1){
                                  //将这个值的位置空出
                                  map[i][j] = 0;
                                  map[k][j] +=n1;
                                  isSlow = 1;
                                  score += map[k][j];
                              }else{
                                  //如果值不相等，则不移动
                                  map[i][j] = 0;
                                  map[k+1][j] = n1;
                                  //当滑到顶端的时候，则不能再滑，直接将flag至1；
                                  if(i != k + 1){
                                      isSlow = 1;
                                  }
                              }
                              break;
                          }
                          if(k == 0){
                              map[i][j] = 0;
                              map[k][j] = n1;
                              if(i != k + 1){
                                  isSlow = 1;
                              }
                          }

                      }
                  }
              }
          };
          return isSlow;
      },
      //向右滑动
      right:function(map){
          //从下往上一次遍历，来判断
          var isSlow = 0;//定义初始状态可滑
          for(var i = map.length - 1;i >= 0;i--){
              for(var j = 0;j < map[i].length;j++){

                  //判断当前值的是否存在
                  if(map[i][j] > 0){
                      var n1 = map[i][j];
                      for(var k = i + 1;k < map.length;k++){
                          //将下方的值遍历,判断下方的值是否存在，如果存在，则判断值是否相等，如果相等则合并，不相等则
                          if(map[k][j] > 0){
                              if(map[k][j] == n1){
                                  map[i][j] = 0;//将位置置空
                                  map[k][j] += n1;
                                  isSlow = 1;//不可滑动
                                  score += map[k][j];
                              }else{
                                  map[i][j] = 0;
                                  map[k-1][j] = n1;
                                  if(i != k-1){
                                      isSlow = 1;
                                  }
                              }
                              break;
                          }
                          if(k == map.length - 1){
                              map[i][j] = 0;
                              map[k][j] = n1;
                              if(i != k-1){
                                  isSlow = 1;
                              }
                          }
                      }
                  }

              }
          };
          return isSlow;//for循环执行完成之后，将flag状态返回出去
      },

      };

      /****************以上判断移动条件*******************************************/

      var Map = {
          //封装随机数字的函数
          randomNum:function (map){
                var x = rand(0,4);//定义x出的随机数是0，4；
                var y = rand(0,4);//定义y出的随机数是0，4；
                var s = 2;//当没有值的时候，随机滑动，直接就是2
                if(rand(0,10) > 7){
                      s = 4;
                 }
                 else{
                    s = 2;
                }
                //当此处的值为空的时候
               if(map[x][y] == 0){
               //直接赋值为2
                   map[x][y] = s;
                   return  map[x][y];
               }else {
                   return this.randomNum(map);
               }


          },
          //画文字
          draw:function(map,ctx){
              //外层for循环控制行，内层控制列
              for(var i = 0;i < 4;i++){
                 for(var j = 0;j < 4;j++){
                     /*
                     * 根据双重for循环(外层控制行，内层控制列)画背景地图，那么我只需要根据这个位置是否有数，如果有数给一种背景颜色，如果没有数
                     * 则给他另一种背景颜色(也就是矩形块的填充颜色),那么也就是说，我只需要通过改变方块的填充色就可以，不必清除画布
                     *
                     * */

                     if(map[i][j] == 0){
                         ctx.fillStyle = 'rgb(208,192,181)';
                     }
                     else{
                         if(map[i][j] == 2 || map[i][j] == 4){

                             ctx.fillStyle = colorArr[0];
                         }
                         if(map[i][j] == 8){
                             ctx.fillStyle = colorArr[1];
                         }
                         if(map[i][j] == 16){
                             ctx.fillStyle = colorArr[2];
                         }
                         if(map[i][j] ==  32){
                             ctx.fillStyle = colorArr[3];
                         }
                         if(map[i][j] == 64){
                             ctx.fillStyle = colorArr[4];
                         }
                         if(map[i][j] == 128){
                             ctx.fillStyle = colorArr[5];
                         }
                     }

                     //画框的坐标和大小
                     ctx.fillRect((i * 100) + (i + 1) * 20 + 50,(j * 100) + (j + 1) * 20 + 200,100,100);
                     /*
                     * 添加文本的时候，我只需要判断便利数组的这个位置是否有值，如果有值，则将数字添加到此位置，数字的坐标
                     * 可以根据画矩形块的坐标来添加，只需要判断字体大小和居中的问题
                     * */

                     if(map[i][j]> 0){
                         // if( < 0){
                             console.log(1);
                             ctx.fillStyle = 'rgb(120,109,101)';
                             ctx.font = 'bold 40px Arial';
                             ctx.fillText(map[i][j],((i * 100) + (i + 1) * 20) +50 + 50,((j * 100) + (j + 1) * 20) + 65 + 200);
                         // }

                     }
                 }
              }
          }

       }



var Start = {
          //创建地图，游戏开始的时候
          createMap:function(){
              console.log(Map.randomNum(mapData));
              console.log(Map.randomNum(mapData));
                  Map.draw(mapData,ctx);

          },
          initGame:function(){
              this.Move(ctx);
              this.createMap();
          },
          //利用键盘的移动来控制
          Move:function(ctx){
              document.onkeydown = function(e){
                  e = e || window.event;
                  //将分数加在页面中
                  ctx.clearRect(490,70,200,100);
                  drawText(520,100,score,'white','30px Myt');
                  gameOver(ctx);
                  //根据按键的四个方向来判断:利用键码
                      switch(e.keyCode){
                          case 37:
                              //如果可以向上滑，那么调用
                              if(Dir.left(mapData)){
                                  Map.randomNum(mapData);
                                  Map.draw(mapData,ctx);
                              }
                              break;
                          case 38:
                              //如果可以向上滑，那么来调用
                              if(Dir.up(mapData)){
                                  //调用画字的函数
                                  Map.randomNum(mapData);
                                  Map.draw(mapData,ctx);

                              }
                              break;
                          case 39:
                              //如果可以向右滑
                              if(Dir.right(mapData)){
                                  Map.randomNum(mapData);
                                  Map.draw(mapData,ctx);
                              }
                              break;

                          case 40:
                              //如果可以向下滑，那么来调用
                              if(Dir.down(mapData)){
                                  //调用的函数
                                  Map.randomNum(mapData);
                                  Map.draw(mapData,ctx);
                              }
                              break;
                      }
              };
          }
      }
Start.initGame();


    function gameOver(ctx){
             if(score > 512){
                 alert('you are winner');
                 document.onkeydown = null;
                 canvas.onclick = function(){
                     score = 0;
                     ctx.clearRect(490,70,500,100);
                     drawText(520,100,score,'white','30px Myt');
                     console.log(mapData);
                     for(var i = 0;i < mapData.length;i++){
                         for(var j = 0;j < mapData[i].length;j++){
                             mapData[i][j] = 0;
                         }
                     }
                     //点击canvas之后，重新调用游戏开始
                     Start.initGame();
                 }
             }
   }

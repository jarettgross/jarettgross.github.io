String path = "data.csv";
String xAxisLabel;
String yAxisLabel;
String[] names; //x-axis data
float[] prices; //y-axis data

//Y-axis data
int numSpaces = 12;
int numTicks = numSpaces + 2;
int tickHeight = 0;
int maxYVal = 0;

boolean isBarChart = true;
boolean isTransitioning = false;
boolean isPieChart = false;

//Transition animation variables
int lastTime;
float elapsedTime;

float barWidth;
float[] xLinesPos;
float[] yLinesPos;
boolean[] xLineTransitionDone;
boolean[] yLineTransitionDone;
float currentCircleSize = 0;

//Pie chart variables
float totalPrice = 0;
float[] percentages;

void setup() {
ellipse(500, 500, 500, 500);
  parseData();
  
  size(1000, 1000);
  
  strokeWeight(3);
  textSize(20);
  textAlign(CENTER, CENTER);
  
  lastTime = millis();
}

void draw() {
  background(255, 255, 255, 1);
  tickHeight = height / (1 + numTicks);
  
  if (!isPieChart) {
    createYAxis();
    createXAxis();
  }
  
  //Buttons for changing graphs
  graphControl();
  
  int currentTime = millis();
  elapsedTime = 1e-3 * (currentTime - lastTime);
  lastTime = currentTime;
  
  if (isPieChart) {
    createPieChart();
  } else if (isBarChart) {
    createBarChart();
  } else {
    createLineChart(); 
  }
  
  if (width < 900 || height < 500) {
    textSize(12); 
  } else {
    textSize(20); 
  }
}

//Parse the data from CSV files into two arrays: names, prices
void parseData() {
  String[] data = loadStrings(path);
  names = new String[data.length - 1];
  prices = new float[data.length - 1];
  xLinesPos = new float[data.length - 1];
  yLinesPos = new float[data.length - 1];
  xLineTransitionDone = new boolean[data.length - 1];
  yLineTransitionDone = new boolean[data.length - 1];
  percentages = new float[data.length - 1];
  
  xAxisLabel = split(data[0], ",")[0];
  yAxisLabel = split(data[0], ",")[1];
  
  for (int i = 1; i < data.length; i++) {
    String[] line = split(data[i], ",");
    names[i - 1] = line[0];
    prices[i - 1] = int(line[1]);
    totalPrice += int(line[1]);
  }
  
  for (int j = 0; j < percentages.length; j++) {
    percentages[j] = 360 * prices[j] / totalPrice;  
  }
}

//Draw the y-axis line and the values for the y-axis ticks
void createYAxis() {
  //Find the maximum price 
  int maxY = -99999;
  int minY = 99999;
  for (int i = 0; i < prices.length; i++) {
    if (prices[i] > maxY) {
      maxY = (int)prices[i]; 
    }
    if (prices[i] < minY) {
      minY = (int)prices[i];
    }
  }
  
  int range = maxY - minY;
  int tickValue = ceil((1.0 * range / numSpaces));
  
  //Draw the y-axis line
  stroke(#000000);
  line(100, height - (tickHeight * numTicks), 100, tickHeight * numTicks); //x1, y1, x2, y2
  
  //Set text properties
  fill(#000000);
  
  //Set y-axis label
  pushMatrix();
  translate(25, height / 2);
  rotate(-PI / 2);
  text(yAxisLabel.toUpperCase(), 0, 0);
  popMatrix();
  
  //Set y-axis text tick values
  int currentYPos = tickHeight * numTicks;
  int currentYVal = tickValue * (minY / tickValue);
  for (int i = 0; i < numTicks; i++) {
    //Write tick value
    textAlign(LEFT, CENTER);
    text(currentYVal, 100 - textWidth("" + currentYVal) - 5, currentYPos); //text, x, y
    strokeWeight(1);
    stroke(100, 100);
    //Draw line for tick value
    line(100, currentYPos, width - 100, currentYPos);
    currentYPos -= tickHeight;
    currentYVal += tickValue;
    maxYVal = currentYVal;
    
    //Reset values
    strokeWeight(3);
    stroke(0, 0, 0, 255);
  }
  textAlign(CENTER, CENTER);
}

//Draw the x-axis line and the values for the x-axis ticks
void createXAxis() {
  stroke(#000000);
  //Draw the x-axis line
  line(100, tickHeight * numTicks, width - 100, tickHeight * numTicks);
  int xAxisWidth = width - 200;
  
  //Set x-axis label
  text(xAxisLabel.toUpperCase(), width / 2, height - 10);
  
  //Set x-axis text names
  int currentXPos = 150;
  for (int i = 0; i < names.length; i++) {
    if (i%2 == 0) {
        text(names[i], currentXPos, tickHeight * numTicks + tickHeight / 4);
    } else {
      text(names[i], currentXPos, tickHeight * numTicks + tickHeight / 2);
    }
    currentXPos += xAxisWidth / names.length;
  }
}

//Draw Button for switching between graph types
void graphControl() {
  float buttonWidth = 130;
  float buttonHeight = 30;
  float buttonXPos = width - buttonWidth;
  float buttonYPos = 0;
  fill(#5495AB);
  rect(buttonXPos - 3, buttonYPos + 3, buttonWidth, buttonHeight); //Switch button
  rect(buttonXPos - 133, buttonYPos + 3, buttonWidth, buttonHeight); //Pie chart button
  fill(#000000);
  text("SWITCH", width - 0.5 * buttonWidth - 3, buttonHeight / 2 + 3);
  if (isPieChart && isBarChart) {
    text("BAR CHART", width - 0.5 * buttonWidth - 133, buttonHeight / 2 + 3);
  } else if (isPieChart && !isBarChart) {
    text("LINE CHART", width - 0.5 * buttonWidth - 133, buttonHeight / 2 + 3);
  } else {
    text("PIE CHART", width - 0.5 * buttonWidth - 133, buttonHeight / 2 + 3);
  }
}

void mouseClicked() {
  //Check if clicked button that switches between graphs
  float buttonWidth = 130;
  float buttonHeight = 33;
  float buttonXPos = width - buttonWidth;
  float buttonYPos = 0;
  if (mouseX >= buttonXPos && mouseX <= buttonXPos + buttonWidth && mouseY >= buttonYPos && mouseY <= buttonYPos + buttonHeight) {
    isTransitioning = true; //Change to false and uncomment line below to disable transitions
    //isBarChart = !isBarChart;
    
    isPieChart = false;
  }
  if (mouseX >= buttonXPos - 133 && mouseX <= buttonXPos && mouseY >= buttonYPos && mouseY <= buttonYPos + buttonHeight) {
    isPieChart = !isPieChart;
  }
}

//Draw the bars for the bar chart
void createBarChart() {
  int xAxisWidth = width - 200;
  
  if (!isTransitioning) barWidth = 0.3 * xAxisWidth / prices.length;
  
  //Create the bars
  float currentXPos = 150 - (barWidth / 2);
  for (int i = 0; i < prices.length; i++) {
    float rectX = currentXPos;
    float rectY = (float)(tickHeight * numTicks - numTicks * tickHeight * (prices[i] / maxYVal));
    float barHeight = (float)(numTicks * tickHeight * (prices[i] / maxYVal));
    
    if (!isTransitioning) {
      xLinesPos[i] = rectX + 20;
      yLinesPos[i] = rectY + barHeight;
      
      //Check if mouse is hovering over bar
      if (mouseX >= currentXPos && mouseX <= currentXPos + barWidth && mouseY >= rectY && mouseY <= rectY + barHeight) {
        stroke(#5ED7FF);
        fill(#5495AB);
        String tooltipText = "(" + names[i] + ", " + prices[i] + ")";
        text(tooltipText, rectX + 10, rectY - 20);
      } else {
        stroke(#000000);
      }
      fill(#000000);
      rect(rectX, rectY, barWidth, barHeight); //x, y, width, height
    } else {
      if (barWidth > 1) { //shrink bars to line width
        barWidth -= 3 * elapsedTime;
        fill(#000000);
        rect(rectX, rectY, barWidth, barHeight); //x, y, width, height
      } else if (i < prices.length) { //rotate lines
        if (i < prices.length - 1 && yLinesPos[i] > tickHeight * numTicks - numTicks * tickHeight * (prices[i + 1] / maxYVal)) {
          if (yLinesPos[i] - tickHeight * numTicks - numTicks * tickHeight * (prices[i + 1] / maxYVal) < -1000) {
            yLinesPos[i] -= 250 * elapsedTime;
          } else {
            yLinesPos[i] -= 70 * elapsedTime; 
          }
        } else {
          yLineTransitionDone[i] = true;
          if (xLinesPos[i] < rectX + xAxisWidth / prices.length) {
            xLinesPos[i] += 50 * elapsedTime;
          } else {
            xLineTransitionDone[i] = true;
            if (currentCircleSize < 10) {
              currentCircleSize += elapsedTime;
            }
            ellipse(rectX, rectY, currentCircleSize, currentCircleSize);
          }
        }
        if (i < prices.length - 1) {
          line(rectX, rectY, xLinesPos[i], yLinesPos[i]);
        }
      }
    }
    
    currentXPos += xAxisWidth / prices.length;
  }
  
  if (isTransitioning) {
    boolean isFinished = true;
    for (int j = 0; j < prices.length; j++) {
      if (!xLineTransitionDone[j] || !yLineTransitionDone[j]) {
        isFinished = false;
        break;
      }
    }
    isTransitioning = !isFinished;
    isBarChart = !isFinished;  
  }
}

//Draw lines and points for the line chart
void createLineChart() {
  int xAxisWidth = width - 200;
  int circleSize = 10;
  
  //Create the lines and circles
  float currentXPos = 150;
  for (int i = 0; i < prices.length; i++) {
    float currentYPos = (float)(tickHeight * numTicks - numTicks * tickHeight * (prices[i] / maxYVal));
    float nextXPos = currentXPos + xAxisWidth / prices.length;
    
    if (!isTransitioning) {
      //Draw the lines
      if (i < prices.length - 1) {
        stroke(#000000);
        float nextYPos = (float)(tickHeight * numTicks - numTicks * tickHeight * (prices[i + 1] / maxYVal));
        line(currentXPos, (float)(tickHeight * numTicks - numTicks * tickHeight * (prices[i] / maxYVal)), nextXPos, nextYPos);
      }
      
      //Check if mouse is hovering over circle
      if (mouseX >= currentXPos - circleSize / 2 && mouseX <= currentXPos + circleSize / 2 && mouseY >= currentYPos - circleSize / 2 && mouseY <= currentYPos + circleSize / 2) {
        stroke(#5ED7FF);
        fill(#5495AB);
        String tooltipText = "(" + names[i] + ", " + prices[i] + ")";
        text(tooltipText, currentXPos + 10, currentYPos - 20);
      } else {
        stroke(#000000);
      }
      
      //Draw data points
      fill(#000000);
      ellipse(currentXPos, currentYPos, circleSize, circleSize);
    } else {
      if (xLineTransitionDone[i] || yLineTransitionDone[i]) { //rotate lines
        if (xLinesPos[i] > currentXPos) {
          xLinesPos[i] -= 50 * elapsedTime;
        } else {
          xLineTransitionDone[i] = false;
          if (currentCircleSize > 0) {
            currentCircleSize -= elapsedTime;  
          }
          ellipse(currentXPos, currentYPos, currentCircleSize, currentCircleSize);
        }
        if (yLinesPos[i] < tickHeight * numTicks - numTicks * tickHeight * (prices[i] / maxYVal)) {
          if (yLinesPos[i] - tickHeight * numTicks - numTicks * tickHeight * (prices[i + 1] / maxYVal) < -1000) {
            yLinesPos[i] += 250 * elapsedTime;
          } else {
            yLinesPos[i] += 70 * elapsedTime; 
          }
        } else {
          yLineTransitionDone[i] = false;
          if (currentCircleSize > 0) {
            currentCircleSize -= elapsedTime;  
          }
          ellipse(currentXPos, currentYPos, currentCircleSize, currentCircleSize);
        }
        line(currentXPos, currentYPos, xLinesPos[i], yLinesPos[i]);
      } else if (barWidth < 0.3 * xAxisWidth / prices.length) { //shrink bars to line width
        barWidth += elapsedTime;
        fill(#000000);
        rect(currentXPos - (barWidth / 2), currentYPos, barWidth, (float)(numTicks * tickHeight * (prices[i] / maxYVal))); //x, y, width, height
      } else {
        fill(#000000);
        rect(currentXPos - (barWidth / 2), currentYPos, barWidth, (float)(numTicks * tickHeight * (prices[i] / maxYVal))); //x, y, width, height  
      }
    }
    
    currentXPos = nextXPos;
  }
  
  if (isTransitioning) {
    boolean isFinished = true;
    for (int j = 0; j < prices.length; j++) {
      if (!(barWidth >= 0.3 * xAxisWidth / prices.length) || xLineTransitionDone[j] || yLineTransitionDone[j]) {
        isFinished = false;
        break;
      }
    }
    isTransitioning = !isFinished;
    isBarChart = isFinished;  
  }
}

//Draw circle and slices for pie chart
void createPieChart() {
  text("Percentages of Total Fruit Price: " + totalPrice, width/2, height/10);
  float diameter = min(width/2, height/2);
  float startAngle = 0;
  float mouseAngle;
  
  float yTextPos = 100;

  for (int i = 0; i < prices.length; i++) {
    stroke(#000000);
    fill(#000000);
    text("(" + names[i] + ", " + prices[i] + ", " + (int)(100 * percentages[i] / 360) + "%)", width - width * .1, yTextPos);
    fill(map(i, 0, prices.length, 0, 255));
    rect(width - width * .15 - 75, yTextPos - 5, 20, 20);
    yTextPos += 30;
    
    
    float endAngle = startAngle + radians(percentages[i]);
    arc(width/2, height/2, diameter, diameter, startAngle, endAngle);
    
    if ((sq(mouseX - width/2) + sq(mouseY - height/2)) <= sq(diameter/2)) {
      if (mouseX - width/2 == 0) {
        if (mouseY - height/2 < 0) {
          mouseAngle = 3 * PI/2;  
        } else {
          mouseAngle = 3 * PI/2;
        }
      } else if (mouseY - height/2 < 0) {
        mouseAngle = 2*PI + atan2(mouseY - height/2, mouseX - width/2);
      } else {
        mouseAngle = atan2(mouseY - height/2, mouseX - width/2);
      }
      
      if (mouseAngle > startAngle && mouseAngle < endAngle) {
        stroke(#5ED7FF);
        arc(width/2, height/2, diameter, diameter, startAngle, endAngle);
        fill(#5495AB);
        String tooltipText = "(" + names[i] + ", " + prices[i] + ", " + (int)(100 * percentages[i] / 360) + "%)";
        text(tooltipText, width/5 - 80, height/2);
      }
    }

    startAngle += radians(percentages[i]);
  }
  stroke(#000000);
}
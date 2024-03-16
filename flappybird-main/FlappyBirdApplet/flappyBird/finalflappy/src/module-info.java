package flappyBird;
import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Rectangle;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.util.ArrayList;
import java.util.Random;
import javax.swing.Timer;
import javax.swing.JFrame;
import java.applet.Applet;


@SuppressWarnings({ "serial", "deprecation" })
public class FlappyBird extends Applet implements ActionListener, MouseListener, KeyListener{
    
    public ArrayList<String> praiseTexts;
    public ArrayList<String> failTexts;
    public static FlappyBird flappyBird;
    public final int WIDTH = 1000, HEIGHT = 800;
    public Renderer renderer;
    public Rectangle bird;
    public ArrayList<Rectangle> columns;
    public Random rand;
    public boolean gameOver, started;
    
    public int ticks, yMotion;
    public double score;
    
    public FlappyBird(){
        JFrame jframe = new JFrame();
        Timer timer = new Timer(20, this); //an integer, and an action listener
        
        renderer = new Renderer();
        rand = new Random();
        
        jframe.add(renderer);
        jframe.addMouseListener(this);
        jframe.setSize(WIDTH, HEIGHT);
        jframe.setResizable(false);
        jframe.setVisible(true);
//        jframe.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        jframe.setTitle("Flappy Bird Game");
        jframe.addKeyListener(this);
        
        bird = new Rectangle(WIDTH / 2 -10, HEIGHT /2 + 30, 20, 20);
        columns = new ArrayList<Rectangle>();
        
                
        addColumn(true);
        addColumn(true);
        addColumn(true);
        addColumn(true);
 
        praiseTexts = new ArrayList<String>();
        failTexts = new ArrayList<String>();
        
        praiseTexts.add("FLAPPY INDEED");
        
        failTexts.add("GAME OVER");
        
        timer.start();
    }

    public void jump(){
        if(gameOver){
            bird = new Rectangle(WIDTH / 2 - 10, HEIGHT /2 - 10 , 20, 20);
            columns.clear();
            yMotion = 0;
            score = 0;
            
            addColumn(true);
            addColumn(true);
            addColumn(true);
            addColumn(true);
            
            gameOver = false;
        }
        if(!started){
           started = true; 
        } else if(!gameOver){
            if(yMotion > 0){
                yMotion = 0;
            }
            yMotion -= 10;
            
        }
        

    }
    
    @Override
    public void actionPerformed(ActionEvent e) {
       int speed = 10;
       
       ticks ++;
       
       if(started){
       
       for(int i = 0; i < columns.size(); i++)
       {
           Rectangle column = columns.get(i);
           column.x -= speed;
           
       }
       
       if(yMotion < 10){
           yMotion  ++;
       }
       
       for(int i = 0; i < columns.size(); i++)
       {
           Rectangle column = columns.get(i);
           if(column.x + column.width < 0){
               columns.remove(column);
               
               if(column.y == 0){
                   addColumn(false);
               }
           }
       }
       
       bird.y += yMotion;
       
       for(Rectangle column : columns){
           if(column.y == 0 && bird.x + bird.width / 2 > column.x + column.width /2 - 10 && bird.x + bird.width / 2 < column.x + column.width /2 + 10){
                score += 1;
           }
           if(column.intersects(bird)){
               gameOver = true;
         
               if(bird.x <= column.x){
               bird.x = column.x - bird.width;}
               else{if(column.y != 0){bird.y = column.y - bird.height;}else if(bird.y < column.height){bird.y = column.height;}}
           }
       }
       
       if(bird.y > HEIGHT - 120 || bird.y == HEIGHT - 120 - bird.height){
           
           gameOver = true;
       }
       
        if(bird.y + yMotion >= HEIGHT - 120){
            bird.y = HEIGHT - 120 - bird.height;
        }
       }
       renderer.repaint();
    }
    
    public void addColumn(boolean start){
        int space = 300;
        int width = 100;
        int height = 50 + rand.nextInt(300);
        
        if(start){ //if it is a starting column
            columns.add(new Rectangle(WIDTH + width + columns.size() * 300, HEIGHT - height - 120, width, height));
            //everything in java is on top left at 0
            columns.add(new Rectangle(WIDTH + width + (columns.size() -1) * 300, 0, width, HEIGHT - height - space));
        }else{
            columns.add(new Rectangle(columns.get(columns.size() - 1).x + 600, HEIGHT - height - 120, width, height));
            columns.add(new Rectangle(columns.get(columns.size() - 1).x, 0, width, HEIGHT - height - space));
        }
    }
    
    public void paintColumn(Graphics g, Rectangle column){
        g.setColor(Color.pink.darker());
        g.fill3DRect(column.x, column.y, column.width, column.height, true);
    }
    
    public void repaint(Graphics g){
        g.setColor(Color.darkGray);//background color
        g.fillRect(0, 0, WIDTH, HEIGHT);
        
        g.setColor(Color.pink.darker().darker());
        g.fillRect(0, HEIGHT - 120, WIDTH, 120);
        
        g.setColor(Color.pink.darker());
        g.fill3DRect(0, HEIGHT - 120, WIDTH, 20, true);
        
       
        
        g.setColor(Color.pink);
        g.fill3DRect(bird.x, bird.y, bird.width, bird.height,true);
        
        for(Rectangle column : columns){
            paintColumn(g,column);
        }
        
       
        g.setFont(new Font("Impact", 1, 100));
        
        if(!started){
             g.setColor(Color.white);
            g.drawString("FLAPPY BIRD", 220, HEIGHT / 2);
            
        }
        
        if(gameOver){
            g.setColor(Color.red);
            
            g.drawString(failTexts.get(0), 250, HEIGHT / 2);
        }
        
        if(!gameOver && started){
            g.setFont(new Font("Arial", 1, 75));
            g.setColor(Color.pink);
            g.drawString(String.valueOf((int)score), 480, 150);
            
            
        }
        
    }
    
    public static void main(String[] args){
        flappyBird = new FlappyBird(); //creating new instance of flappy bird
        
    }
    
    public void mouseClicked(MouseEvent e){
        
    }
    
    public void mousePressed(MouseEvent e){
        
    }
    
    public void mouseReleased(MouseEvent e){
        
    }
    
    public void mouseEntered(MouseEvent e){
        
    }
    
    public void mouseExited(MouseEvent e){
        
    }
    
    public void keyPressed(KeyEvent e){
        
    }
    
    public void keyReleased(KeyEvent e){
        if(e.getKeyCode() == KeyEvent.VK_SPACE){
            jump();
        }
    }
    
    public void keyTyped(KeyEvent e){
        
    }

}
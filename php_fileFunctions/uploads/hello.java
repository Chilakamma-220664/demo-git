import java.util.Scanner;
public class hello{
    public static void main(String[] args){
        Scanner scanner=new Scanner(System.in);
        System.out.println("enter a number");
        int num=scanner.nextInt();
        System.out.println("the number is :"+num);
        scanner.close();
    }
}
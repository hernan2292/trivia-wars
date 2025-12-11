<?php

namespace Database\Seeders;

use App\Models\Question;
use Illuminate\Database\Seeder;

class QuestionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $questions = [
            [
                'text' => 'Who created Bitcoin?',
                'options' => ['Satoshi Nakamoto', 'Vitalik Buterin', 'Elon Musk', 'Sam Altman'],
                'correct_answer' => 'Satoshi Nakamoto',
                'category' => 'crypto',
                'difficulty' => 'easy',
            ],
            [
                'text' => 'What does HTTP stand for?',
                'options' => ['HyperText Transfer Protocol', 'High Tech Transfer Protocol', 'HyperText Technical Protocol', 'Home Tool Transfer Protocol'],
                'correct_answer' => 'HyperText Transfer Protocol',
                'category' => 'tech',
                'difficulty' => 'easy',
            ],
            [
                'text' => 'Which planet is known as the Red Planet?',
                'options' => ['Mars', 'Venus', 'Jupiter', 'Saturn'],
                'correct_answer' => 'Mars',
                'category' => 'science',
                'difficulty' => 'easy',
            ],
            [
                'text' => 'In which year did World War II end?',
                'options' => ['1945', '1944', '1939', '1918'],
                'correct_answer' => '1945',
                'category' => 'history',
                'difficulty' => 'medium',
            ],
            [
                'text' => 'Which programming language is known as the language of the web?',
                'options' => ['JavaScript', 'Python', 'C++', 'Java'],
                'correct_answer' => 'JavaScript',
                'category' => 'tech',
                'difficulty' => 'easy',
            ],
            [
                'text' => 'What is the capital of France?',
                'options' => ['Paris', 'London', 'Berlin', 'Madrid'],
                'correct_answer' => 'Paris',
                'category' => 'geography',
                'difficulty' => 'easy',
            ],
            [
                'text' => 'Who painted the Mona Lisa?',
                'options' => ['Leonardo da Vinci', 'Pablo Picasso', 'Vincent van Gogh', 'Michelangelo'],
                'correct_answer' => 'Leonardo da Vinci',
                'category' => 'art',
                'difficulty' => 'medium',
            ],
            [
                'text' => 'Which element has the chemical symbol O?',
                'options' => ['Oxygen', 'Gold', 'Silver', 'Iron'],
                'correct_answer' => 'Oxygen',
                'category' => 'science',
                'difficulty' => 'easy',
            ],
            [
                'text' => 'What is the largest ocean on Earth?',
                'options' => ['Pacific Ocean', 'Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean'],
                'correct_answer' => 'Pacific Ocean',
                'category' => 'geography',
                'difficulty' => 'medium',
            ],
            [
                'text' => 'Which company developed the Windows operating system?',
                'options' => ['Microsoft', 'Apple', 'Google', 'IBM'],
                'correct_answer' => 'Microsoft',
                'category' => 'tech',
                'difficulty' => 'easy',
            ],
            // Adding a few more to ensure we have >= 10
             [
                'text' => 'What is the currency of Japan?',
                'options' => ['Yen', 'Dollar', 'Euro', 'Won'],
                'correct_answer' => 'Yen',
                'category' => 'geography',
                'difficulty' => 'easy',
            ],
             [
                'text' => 'Who wrote "Hamlet"?',
                'options' => ['William Shakespeare', 'Charles Dickens', 'Mark Twain', 'J.K. Rowling'],
                'correct_answer' => 'William Shakespeare',
                'category' => 'literature',
                'difficulty' => 'medium',
            ],
        ];

        foreach ($questions as $q) {
            Question::create($q);
        }
    }
}

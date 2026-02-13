
export interface ThemeAsset {
  backgroundImage: string;
  quotes: string[];
}

export const QUOTES_DATABASE = [
  // Existing Quotes
  { en: "Language is the road map of a culture.", vi: "Ngôn ngữ là bản đồ văn hóa của một dân tộc." },
  { en: "To have another language is to possess a second soul.", vi: "Biết thêm một ngôn ngữ là sống thêm một cuộc đời." },
  { en: "Learning never exhausts the mind.", vi: "Sự học không bao giờ làm trí tuệ kiệt sức." },
  { en: "Do not be afraid to make mistakes.", vi: "Đừng sợ mắc sai lầm." },
  { en: "A journey of a thousand miles begins with a single step.", vi: "Hành trình ngàn dặm bắt đầu từ một bước chân." },
  { en: "Practice makes progress, not perfection.", vi: "Luyện tập tạo ra sự tiến bộ, không phải sự hoàn hảo." },
  { en: "Speak only if it improves upon the silence.", vi: "Chỉ nói khi lời nói của bạn tốt đẹp hơn sự im lặng." },
  { en: "The limits of my language mean the limits of my world.", vi: "Giới hạn ngôn ngữ là giới hạn thế giới của tôi." },
  { en: "Change your language and you change your thoughts.", vi: "Thay đổi ngôn ngữ, bạn sẽ thay đổi tư duy." },
  { en: "Every day is a new opportunity.", vi: "Mỗi ngày là một cơ hội mới." },
  { en: "Dream big and dare to fail.", vi: "Hãy mơ lớn và dám thất bại." },
  { en: "Consistency is key.", vi: "Kiên trì là chìa khóa." },

  // New Quotes (40 added)
  { en: "Education is the most powerful weapon which you can use to change the world.", vi: "Giáo dục là vũ khí mạnh nhất bạn có thể dùng để thay đổi thế giới. (Nelson Mandela)" },
  { en: "All our dreams can come true, if we have the courage to pursue them.", vi: "Tất cả ước mơ đều có thể thành hiện thực nếu ta có đủ can đảm để theo đuổi chúng. (Walt Disney)" },
  { en: "The future belongs to those who believe in the beauty of their dreams.", vi: "Tương lai thuộc về những ai tin vào vẻ đẹp trong những giấc mơ của mình. (Eleanor Roosevelt)" },
  { en: "It does not matter how slowly you go as long as you do not stop.", vi: "Việc bạn đi chậm thế nào không quan trọng, miễn là bạn không dừng lại. (Confucius)" },
  { en: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", vi: "Chúng ta là những gì chúng ta lặp đi lặp lại. Sự xuất sắc không phải là một hành động, mà là một thói quen. (Aristotle)" },
  { en: "The beginning is the most important part of the work.", vi: "Sự khởi đầu là phần quan trọng nhất của công việc. (Plato)" },
  { en: "The secret of getting ahead is getting started.", vi: "Bí quyết của sự vượt lên chính là bắt đầu. (Mark Twain)" },
  { en: "Life is either a daring adventure or nothing at all.", vi: "Cuộc sống hoặc là một cuộc phiêu lưu táo bạo, hoặc không là gì cả. (Helen Keller)" },
  { en: "Success is stumbling from failure to failure with no loss of enthusiasm.", vi: "Thành công là đi từ thất bại này đến thất bại khác mà không mất đi nhiệt huyết. (Winston Churchill)" },
  { en: "Knowing is not enough, we must apply. Willing is not enough, we must do.", vi: "Biết thôi chưa đủ, ta phải vận dụng. Muốn thôi chưa đủ, ta phải hành động. (Bruce Lee)" },
  { en: "Be the change that you wish to see in the world.", vi: "Hãy là sự thay đổi mà bạn muốn thấy trên thế giới này. (Mahatma Gandhi)" },
  { en: "Be yourself; everyone else is already taken.", vi: "Hãy là chính mình; những người khác đã là chính họ rồi. (Oscar Wilde)" },
  { en: "I have not failed. I've just found 10,000 ways that won't work.", vi: "Tôi không thất bại. Tôi chỉ tìm ra 10,000 cách không hiệu quả thôi. (Thomas Edison)" },
  { en: "Logic will get you from A to B. Imagination will take you everywhere.", vi: "Logic sẽ đưa bạn từ điểm A đến điểm B. Trí tưởng tượng sẽ đưa bạn đến mọi nơi. (Albert Einstein)" },
  { en: "Life was like a box of chocolates. You never know what you're gonna get.", vi: "Cuộc đời như một hộp sô cô la. Bạn không bao giờ biết mình sẽ nhận được gì. (Forrest Gump)" },
  { en: "Do or do not. There is no try.", vi: "Làm hoặc không làm. Không có chuyện 'làm thử'. (Yoda)" },
  { en: "You are never too old to set another goal or to dream a new dream.", vi: "Không bao giờ là quá già để đặt ra một mục tiêu mới hay mơ một giấc mơ mới. (C.S. Lewis)" },
  { en: "There is nothing noble in being superior to your fellow man; true nobility is being superior to your former self.", vi: "Không có gì cao quý khi vượt trội hơn người khác; sự cao quý thực sự là vượt qua chính mình ngày hôm qua. (Ernest Hemingway)" },
  { en: "Rock bottom became the solid foundation on which I rebuilt my life.", vi: "Đáy vực sâu đã trở thành nền móng vững chắc để tôi xây dựng lại cuộc đời. (J.K. Rowling)" },
  { en: "Tell me and I forget. Teach me and I remember. Involve me and I learn.", vi: "Nói cho tôi, tôi sẽ quên. Dạy cho tôi, tôi sẽ nhớ. Cho tôi tham gia, tôi sẽ học. (Benjamin Franklin)" },
  { en: "For my part I know nothing with any certainty, but the sight of the stars makes me dream.", vi: "Phần tôi thì chẳng biết gì chắc chắn, nhưng ánh sao trời khiến tôi mơ mộng. (Vincent Van Gogh)" },
  { en: "Hope is the thing with feathers that perches in the soul.", vi: "Hy vọng là thứ có đôi cánh, đậu lại trong tâm hồn. (Emily Dickinson)" },
  { en: "Do not go where the path may lead, go instead where there is no path and leave a trail.", vi: "Đừng đi theo lối mòn, hãy đi đến nơi chưa có đường và để lại dấu chân. (Ralph Waldo Emerson)" },
  { en: "You are not a drop in the ocean. You are the entire ocean in a drop.", vi: "Bạn không phải là một giọt nước trong đại dương. Bạn là cả đại dương trong một giọt nước. (Rumi)" },
  { en: "The journey of a thousand miles begins with a single step.", vi: "Hành trình ngàn dặm bắt đầu từ một bước chân. (Lao Tzu)" },
  { en: "Luck is what happens when preparation meets opportunity.", vi: "May mắn là điều xảy ra khi sự chuẩn bị gặp gỡ cơ hội. (Seneca)" },
  { en: "Wisdom begins in wonder.", vi: "Trí tuệ bắt đầu từ sự kinh ngạc. (Socrates)" },
  { en: "Learning never exhausts the mind.", vi: "Sự học không bao giờ làm tâm trí kiệt quệ. (Leonardo da Vinci)" },
  { en: "Music is a higher revelation than all wisdom and philosophy.", vi: "Âm nhạc là sự mặc khải cao hơn mọi tri thức và triết học. (Beethoven)" },
  { en: "It is not in the stars to hold our destiny but in ourselves.", vi: "Định mệnh không nằm ở các vì sao mà nằm ở chính chúng ta. (Shakespeare)" },
  { en: "Not all those who wander are lost.", vi: "Không phải ai lang thang cũng là người lạc lối. (J.R.R. Tolkien)" },
  { en: "Two roads diverged in a wood, and I—I took the one less traveled by.", vi: "Hai con đường tách lối trong rừng, và tôi - tôi chọn lối ít người đi. (Robert Frost)" },
  { en: "Go confidently in the direction of your dreams.", vi: "Hãy tự tin tiến về phía ước mơ của bạn. (Henry David Thoreau)" },
  { en: "The biggest adventure you can take is to live the life of your dreams.", vi: "Cuộc phiêu lưu lớn nhất bạn có thể thực hiện là sống cuộc đời mình mơ ước. (Oprah Winfrey)" },
  { en: "Your time is limited, so don't waste it living someone else's life.", vi: "Thời gian của bạn là hữu hạn, đừng lãng phí nó để sống cuộc đời của người khác. (Steve Jobs)" },
  { en: "Whether you think you can or you think you can't, you're right.", vi: "Dù bạn nghĩ mình có thể hay không thể, bạn đều đúng. (Henry Ford)" },
  { en: "Have no fear of perfection - you'll never reach it.", vi: "Đừng sợ sự hoàn hảo - bạn sẽ không bao giờ đạt được nó đâu. (Salvador Dalí)" },
  { en: "Creativity is intelligence having fun.", vi: "Sáng tạo là khi trí thông minh đang vui đùa. (Albert Einstein)" },
  { en: "Simplicity is the ultimate sophistication.", vi: "Đơn giản là đỉnh cao của sự tinh tế. (Leonardo da Vinci)" },
  { en: "The best way to predict the future is to create it.", vi: "Cách tốt nhất để dự đoán tương lai là tạo ra nó. (Peter Drucker)" }
];

// High quality, free nature/landscape backgrounds from Unsplash
export const BACKGROUND_IMAGES = [
  // Existing Images
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1920", // Mountains
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1920", // River Valley
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1920", // Foggy Forest
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1920", // Green Forest
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80&w=1920", // Sunset Hills
  "https://images.unsplash.com/photo-1501854140884-074cf2b21d25?auto=format&fit=crop&q=80&w=1920", // Lake
  "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?auto=format&fit=crop&q=80&w=1920", // Garden
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=1920", // Night Sky
  "https://images.unsplash.com/photo-1495616811223-4d98c6e9d869?auto=format&fit=crop&q=80&w=1920", // Sunset
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=1920", // Nature Travel
  "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80&w=1920", // Dark Woods

  // New Images (10 added)
  "https://images.unsplash.com/photo-1507842217121-ad559d712d01?auto=format&fit=crop&q=80&w=1920", // Deep forest path
  "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&q=80&w=1920", // Morning field
  "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&q=80&w=1920", // Winter window
  "https://images.unsplash.com/photo-1515549832467-b39d3447cd1e?auto=format&fit=crop&q=80&w=1920", // Arctic aurora
  "https://images.unsplash.com/photo-1491466424936-e304919aada7?auto=format&fit=crop&q=80&w=1920", // Desert dunes
  "https://images.unsplash.com/photo-1520034475321-cbe63696469a?auto=format&fit=crop&q=80&w=1920", // Abstract bokeh city
  "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=1920", // Library books
  "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=1920", // Minimalist plant
  "https://images.unsplash.com/photo-1489549132488-d00b7eee80f1?auto=format&fit=crop&q=80&w=1920", // Galaxy stars
  "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1920"  // Zen stones/water
];

// Fallback theme
const DEFAULT_THEME: ThemeAsset = {
  backgroundImage: BACKGROUND_IMAGES[0],
  quotes: QUOTES_DATABASE.map(q => q.en)
};

export const THEME_ASSETS: Record<string, ThemeAsset> = {
  'work': {
    backgroundImage: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1920", 
    quotes: ["Success is not final, failure is not fatal."]
  }
};

export const getThemeForTopic = (topicString: string): ThemeAsset => {
  const randomImage = BACKGROUND_IMAGES[Math.floor(Math.random() * BACKGROUND_IMAGES.length)];
  return {
    backgroundImage: randomImage,
    quotes: QUOTES_DATABASE.map(q => q.en)
  };
};

export const getRandomQuoteObj = () => {
  return QUOTES_DATABASE[Math.floor(Math.random() * QUOTES_DATABASE.length)];
};

export const getRandomQuote = (theme: ThemeAsset): string => {
  const q = QUOTES_DATABASE[Math.floor(Math.random() * QUOTES_DATABASE.length)];
  return q.en; 
};

import { getUserProfile, updateUserProfile } from "../lib/firebase.js";

export const canUseChats = async (uid, message, tokenLimit = 100) => {
  const userProfile = await getUserProfile(uid);
  if (!userProfile) return { allowed: false, tokensLeft: 0 };

  const now = new Date();
  const lastReset = new Date(userProfile.lastTokenReset);
  const newDay = now.toDateString() !== lastReset.toDateString();

  // Pro users get unlimited tokens
  if (userProfile.subscription === "Pro") {
    return { allowed: true, tokensLeft: Infinity };
  }

  let tokensUsedToday = userProfile.tokensUsedToday || 0;

  const tokensPerMessage = Math.ceil((message || "").length / 4);

  // reset tokens if it's a new day
  if (newDay) {
    tokensUsedToday = 0;
    await updateUserProfile(uid, {
      tokensUsedToday: 0,
      lastTokenReset: now.toISOString(),
    });
  }

  if (tokensUsedToday + tokensPerMessage <= tokenLimit) {
    await updateUserProfile(uid, {
      tokensUsedToday: tokensUsedToday + tokensPerMessage,
      updatedAt: now.toISOString(),
    });
    return {
      allowed: true,
      tokensLeft: tokenLimit - (tokensUsedToday + tokensPerMessage),
    };
  } else {
    return { allowed: false, tokensLeft: 0 };
  }
};
